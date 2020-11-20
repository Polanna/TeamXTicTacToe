using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace TeamXTicTacToe.DAO
{
    public class TicTacBlobClient<T>
    {
        private readonly string connectionString;
        private readonly string containerName;
        private BlobContainerClient containerClient;

        public TicTacBlobClient(string connectionString, string containerName)
        {
            this.connectionString = connectionString;
            this.containerName = containerName;
            Initialize().Wait();
        }

        private async Task Initialize()
        {
            // If the container client has already been created, then there is nothing to do here
            if (containerClient != null)
            {
                return;
            }

            // Create a BlobServiceClient object which will be used to create a container client
            BlobServiceClient blobServiceClient = new BlobServiceClient(this.connectionString);
            BlobContainerItem item = blobServiceClient.GetBlobContainers(prefix: this.containerName).FirstOrDefault();
            
            if (item == null)
            {
                this.containerClient = await blobServiceClient.CreateBlobContainerAsync(this.containerName);
            }
            else
            {
                this.containerClient = blobServiceClient.GetBlobContainerClient(this.containerName);
            }
        }

        public async Task SaveAsync(T t, string id)
        {
            string fileName = id + ".json";
            BlobClient blobClient = containerClient.GetBlobClient(fileName);

            await Serialize(t, blobClient);
        }

        public async Task<T> GetAsync(string id)
        {
            string fileName = id + ".json";
            BlobClient blobClient = containerClient.GetBlobClient(fileName);

            BlobDownloadInfo download = await blobClient.DownloadAsync();
            return Deserialize(download.Content);
        }

        public IEnumerable<string> GetIds()
        {
            //TODO: drop .json (see get above)
            return containerClient.GetBlobs().Select(b => b.Name);
        }
        public async Task<IEnumerable<T>> GetAllAsync()
        {
            List<T> items = new List<T>();
            await foreach (BlobItem blobItem in containerClient.GetBlobsAsync())
            {
                BlobClient blobClient = containerClient.GetBlobClient(blobItem.Name);
                BlobDownloadInfo download = await blobClient.DownloadAsync();
                items.Add(Deserialize(download.Content));
            }
            return items;
        }

        private static async Task Serialize(T value, BlobClient blobClient)
        {
            MemoryStream memStream = new MemoryStream();

            using (StreamWriter writer = new StreamWriter(memStream))
            using (JsonTextWriter jsonWriter = new JsonTextWriter(writer))
            {
                JsonSerializer ser = new JsonSerializer();
                ser.Serialize(jsonWriter, value);
                jsonWriter.Flush();

                memStream.Seek(0, SeekOrigin.Begin);
                await blobClient.UploadAsync(memStream, true);
            }

        }

        private static T Deserialize(Stream s)
        {
            using (StreamReader reader = new StreamReader(s))
            using (JsonTextReader jsonReader = new JsonTextReader(reader))
            {
                JsonSerializer ser = new JsonSerializer();
                return ser.Deserialize<T>(jsonReader);
            }
        }
    }
}
