const fs = require("fs-extra");
const request = require("request");
const path = require("path");

module.exports = {
  config: {
    name: "owner",
    version: "1.3.0",
    author: "CHUDI",
    role: 0,
    shortDescription: "Owner information with image",
    category: "Information",
    guide: {
      en: "owner"
    }
  },

  onStart: async function ({ api, event }) {
    const ownerText = 
`╭─ 👑 Oᴡɴᴇʀ Iɴғᴏ 👑 ─╮
│ 👤 Nᴀᴍᴇ       :
 亗𝐀𝐁𝐃𝐔𝐋𝐋𝐀𝐇 𝐖𝐀𝐑𝐈𝐒
│🧸 Nɪᴄᴋ       :
  Nahin
│ 🎂 Aɢᴇ        :
 19+
│ 💘 Rᴇʟᴀᴛɪᴏɴ :
 Sɪɴɢʟᴇ
│ 🎓 Pʀᴏғᴇssɪᴏɴ :
 Sᴛᴜᴅᴇɴᴛ 
│ 🏡 Lᴏᴄᴀᴛɪᴏɴ :
 coxbazar . mohesh Khali 
├─ 🔗 Cᴏɴᴛᴀᴄᴛ ─╮
│ 📞 WhatsApp  :
 wa.me/+8801897876272
╰────────────────╯`;

    const cacheDir = path.join(__dirname, "cache");
    const imgPath = path.join(cacheDir, "owner.jpg");

    if (!fs.existsSync(cacheDir)) fs.mkdirSync(cacheDir);

    const imgLink = "https://i.imgur.com/DMq0kM9.jpeg";

    const send = () => {
      api.sendMessage(
        {
          body: ownerText,
          attachment: fs.createReadStream(imgPath)
        },
        event.threadID,
        () => fs.unlinkSync(imgPath),
        event.messageID
      );
    };

    request(encodeURI(imgLink))
      .pipe(fs.createWriteStream(imgPath))
      .on("close", send);
  }
};
