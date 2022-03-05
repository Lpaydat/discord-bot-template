import { MessageEmbed } from "discord.js";

import { SlashCommandBuilder } from "@discordjs/builders";

import { Command } from "../interfaces/Command";
import { getCamperData } from "../modules/getCamperData";

export const view: Command = {
  data: new SlashCommandBuilder()
    .setName("view")
    .setDescription("Shows your latest 100 days of code check in."),
  run: async (interaction) => {
    await interaction.deferReply({ ephemeral: true });

    const { user } = interaction;

    const targetCamper = await getCamperData(user.id);

    if (!targetCamper.day) {
      interaction.editReply({
        content:
          "It looks like you have not started the 100 Days of Code challenge yet. Use `/100` and add your message to report your first day!",
      });
      return;
    }

    const viewEmbed = new MessageEmbed();

    viewEmbed.setTitle("My 100DoC Progress");
    viewEmbed.setDescription(
      `Here is my 100 Days of Code progress. I last reported an update on: ${targetCamper.timestamp}`
    );
    viewEmbed.setAuthor({
      name: user.tag,
      iconURL: user.displayAvatarURL(),
    });
    viewEmbed.addField("Round", targetCamper.round.toString());
    viewEmbed.addField("Day", targetCamper.day.toString());

    await interaction.editReply({ embeds: [viewEmbed] });
  },
};
