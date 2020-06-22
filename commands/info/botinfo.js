/* eslint-disable no-unused-vars */
/* eslint-disable no-mixed-spaces-and-tabs */
const { MessageEmbed } = require('discord.js');
const { formatBytes } = require('../../functions.js');
const { parseDur } = require('../../functions.js');
const moment = require('moment');
const prefix = process.env.prefix;
const os = require('os');
const cpuStat = require('cpu-stat');

module.exports = {
	name: 'botinfo',
	category: 'Info',
	description: 'Displays information about the bot.',
	aliases: ['bot'],
	usage: `${prefix}botinfo`,
	run: async (client, message, args) => {
		cpuStat.usagePercent(function(error, percent, seconds) {
			if(error) {
				return console.error(error);
			}
			const core = os.cpus()[0];
			const cores = os.cpus().length;

			const embed = new MessageEmbed()
				.setDescription(`**Bot information for ${client.user.username}**`)
				.setThumbnail(client.user.displayAvatarURL({ dynamic: true, size: 512 }))
				.setColor(client.displayHexColor || 'BLUE')
				.addField('General Statistics:', [
					`**❯ Server:** ${client.guilds.cache.size.toLocaleString()}`,
					`**❯ Users:** ${client.users.cache.size.toLocaleString()}`,
					`**❯ Channel:** ${client.channels.cache.size.toLocaleString()}`,
					`**❯ Commands:** ${client.commands.size}`,
					`**❯ Creation Date:** ${moment(client.user.createdTimestamp).format('Do MMMM YYYY HH:mm')}`,
					`**❯ Uptime:** ${parseDur(client.uptime)}`,
					'\u200b',
				])
				.addField('System Statistics:', [
					`**❯ Node.js Version:** ${process.version}`,
					`**❯ Platform:** ${os.platform}`,
					'**❯ CPU:** ',
					`\u3000 - Model: ${core.model}`,
					`\u3000 - Cores: ${cores}`,
					`\u3000 - Speed: ${core.speed}MHz`,
					`\u3000 - Usage: ${percent.toFixed(2)}%`,
					'**❯ Memory:** ',
					`\u3000 - Total: ${formatBytes(process.memoryUsage().heapTotal)}`,
					`\u3000 - Used: ${formatBytes(process.memoryUsage().heapUsed)}`,
					'\u200b',
				]);
			message.channel.send(embed);
		});
	},
};