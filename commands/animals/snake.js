/* eslint-disable no-unused-vars */
const { MessageEmbed } = require('discord.js');
const h2p = require('html2plaintext');
const fetch = require('node-fetch');

module.exports = {
  name: 'snake',
  category: 'Animals',
  description: 'Are they really that scary?',
  aliases: ['snakes', 'snek'],
  usage: 'snake',
  run: async (client, message, args) => {
    const subreddits = [
      'Snek',
      'ballpython',
    ];

    const sub = subreddits[Math.round(Math.random() * (subreddits.length - 1))];

    const url = [
      `https://www.reddit.com/r/${sub}/hot.json`,
    ];

    let response;
    try {
      response = await fetch(url)
        .then(res => res.json())
        .then(json => json.data.children.map(v => v.data))
        .then(post => {
          const random = post[Math.floor(Math.random() * post.length) + 1];
          if (random.is_video === true || !random.url.endsWith('jpg')) {
            return message.channel.send(
              '<:vError:725270799124004934> An error occured, please try again!',
            );
          }
          const embed = new MessageEmbed()
            .setColor('BLUE')
            .setImage(random.url);

          message.channel.send(embed);
        });
    }
    catch (e) {
      return message.channel.send(
        '<:vError:725270799124004934> An error occured, please try again!',
      );
    }
  },
};