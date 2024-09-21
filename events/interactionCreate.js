require("dotenv").config();
module.exports = {
  name: "interactionCreate",
  async execute(interaction, client) {
    if (interaction.isChatInputCommand()) {
      const command = client.commands.get(interaction.commandName);
      if (!command) return;
      if (command.ownerOnly) {
        if (interaction.user.id !== process.env.ownerId) {
          return interaction.reply({
            content: "You are not allowed to use this command",
            ephemeral: true,
          });
        }
      }

      try {
        await command.run(interaction, client);
      } catch (error) {
        console.log(error);
        await interaction.reply({
          content: "There was an error while executing this command!",
          ephemeral: true,
        });
      }
    }
  },
};
