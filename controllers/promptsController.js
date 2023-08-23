const Prompt = require("../models/promptsModel.js");

const resolvers = {
  promptsByUserID: async ({ userID, type, tag }) => {
    const filters = { userID };

    if (type) {
      filters.type = type;
    }

    if (tag) {
      filters.tag = tag;
    }

    const prompts = await Prompt.find(filters);
    return prompts;
  }
};

module.exports = resolvers;