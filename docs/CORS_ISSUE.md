# CORS Policy Setup

To properly configure the Cross-Origin Resource Sharing (CORS) policy for your Google Cloud Storage bucket, follow these steps:

1. **Navigate to Google Cloud Storage:**
   Visit the Google Cloud Storage Browser by going to [https://console.cloud.google.com/storage/browser](https://console.cloud.google.com/storage/browser).

2. **Activate Cloud Shell:**
   In the Google Cloud Console, activate the Cloud Shell (small terminal icon in upper right corner of the page). This provides you with command-line access to your cloud resources.

3. **Create a CORS Configuration File:**
   In the Cloud Shell, create a new file named `cors.json`. You can do this using a text editor like `nano` or `vim`. For instance, type `nano cors.json`.

4. **Edit CORS Configuration:**
   Insert the following configuration into the `cors.json` file:

   ```json
   [
       {
           "origin": ["*"],
           "method": ["GET"],
           "maxAgeSeconds": 3600
       }
   ]
   ```

After editing the file, save and exit the text editor. 

5. **Update bucket CORS policy**

Next, use the gcloud command to update your storage bucket with the CORS configuration. Replace BUCKET_NAME with the name of your bucket associated with your Firebase application:

```shell
gcloud storage buckets update gs://BUCKET_NAME --cors-file=cors.json
```

This command updates the CORS settings for your specified storage bucket. The --cors-file=cors.json option tells gcloud to use the CORS configuration from the cors.json file you just created.