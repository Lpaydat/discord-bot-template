import { MessageEmbed } from "discord.js";

import { SlashCommandBuilder } from "@discordjs/builders";

import { Command } from "../interfaces/Command";
import { getCamperData } from "../modules/getCamperData";
import { updateCamperData } from "../modules/updateCamperData";

export const oneHundred: Command = {
  data: new SlashCommandBuilder()
    .setName("100")
    .setDescription("Check in for the 100 Days of Code challenge.")
    .addStringOption((option) =>
      option
        .setName("message")
        .setDescription("The message to go in your 100 Days of Code update.")
        .setRequired(true)
    ),
  run: async (interaction) => {
    await interaction.deferReply();

    const { user } = interaction;
    const text = interaction.options.getString("message", true);

    const targetCamper = await getCamperData(user.id);
    const updatedCamper = await updateCamperData(targetCamper);

    const oneHundredEmbed = new MessageEmbed();

    oneHundredEmbed.setTitle("100 Days of Code");
    oneHundredEmbed.setDescription(text);
    oneHundredEmbed.setAuthor({
      name: user.tag,
      iconURL: user.displayAvatarURL(),
    });
    oneHundredEmbed.addField("Round", updatedCamper.round.toString(), true);
    oneHundredEmbed.addField("Day", updatedCamper.day.toString(), true);
    oneHundredEmbed.setFooter({
      text:
        "Day completed: " +
        new Date(updatedCamper.timestamp).toLocaleDateString(),
    });

    await interaction.editReply({ embeds: [oneHundredEmbed] });
  },
};
