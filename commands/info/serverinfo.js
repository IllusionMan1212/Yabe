const Discord = require('discord.js');

function checkDays(date) {
    let now = new Date();
    let diff = now.getTime() - date.getTime();
    let days = Math.floor(diff / 86400000);
    return days + (days == 1 ? " day" : " days") + " ago";
};

exports.run = (client, message) => {
    let embed = new Discord.MessageEmbed();
    let verifLevels = ["None", "Low", "Medium", "(╯°□°）╯︵  ┻━┻", "┻━┻ミヽ(ಠ益ಠ)ノ彡┻━┻"];
    let region = {
        "amsterdam": "Amsterdam",
        "brazil": "Brazil",
        "europe": "Europe",
        "eu-central": "Central Europe",
        "hongkong": "Hong Kong",
        "india": "India",
        "japan": "Japan",
        "russia": "Russia",
        "singapore": "Singapore",
        "southafrica": "South Africa",
        "sydney": "Sydney",
        "us-central": "U.S. Central",
        "us-east": "U.S. East",
        "us-south": "U.S. South",
        "us-west": "U.S. West",
        "eu-west": "Western Europe",
        "vip-us-east": "VIP U.S. East",
        "london": "London",
    };

    var emojis;
    if (message.guild.emojis.cache.size === 0) {
        emojis = 'None';
    } else {
        emojis = message.channel.guild.emojis.cache.map(e => e).join(" ");
    }
    embed.setAuthor(message.guild.name, message.guild.iconURL() ? message.guild.iconURL() : client.user.displayAvatarURL())
        .setThumbnail(message.guild.iconURL() ? message.guild.iconURL() : client.user.displayAvatarURL())
        .addField("Created", `${message.guild.createdAt.toString().substr(0, 15)},\n${checkDays(message.guild.createdAt)}`, true)
        .addField("ID", message.guild.id, true)
        .addField("Owner", `${message.guild.owner.user.username}#${message.guild.owner.user.discriminator}`, true)
        .addField("Region", region[message.guild.region], true)
        .addField("Members", message.guild.memberCount, true)
        .addField("Roles", message.guild.roles.cache.size, true)
        .addField("Channels", message.guild.channels.cache.size, true)
        //.addField("Emojis", emojis, true)
        .setColor(client.config.embedColor);
    message.channel.send({ embed });
}

exports.help = {
    enabled: true,
    hideHelp: false,
    type: "info",
    name: "serverinfo",
    description: "The `serverinfo` command returns info about the current server, such as when it was created and the owner, etc.",
    usage: "`yabe serverinfo`",
}