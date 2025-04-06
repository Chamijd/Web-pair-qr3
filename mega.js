const mega = require("megajs");

const credentials = {
  email: 'newab17760@noroasis.com',
  password: 'Chamindu2008',
  userAgent: "MyApp/1.0"  // Simplified userAgent
};

const upload = (fileStream, fileName) => {
  return new Promise((resolve, reject) => {
    const storage = new mega.Storage(credentials);

    storage.on("ready", () => {
      const uploadStream = storage.upload({ name: fileName });
      
      uploadStream.on("complete", (file) => {
        file.link((err, link) => {
          if (err) reject(err);
          else resolve(link);
        });
      });

      uploadStream.on("error", (err) => reject(err));
      fileStream.pipe(uploadStream);
    });

    storage.on("error", (err) => reject(err));
  });
};

module.exports = { upload };
