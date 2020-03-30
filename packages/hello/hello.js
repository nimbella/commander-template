'use strict';

/**
 * @description Says "Hello, world!" or "Hello, <name>" when the name is provided.
 * @param {ParamsType} params list of command parameters
 * @param {?string} commandText text message
 * @param {!object} [secrets = {}] list of secrets
 * @return {Promise<SlackBodyType>} Response body
 */
async function _command(params, commandText, secrets) {
  const {name = 'World'} = params;
  // This array is used to store slack blocks.
  const result = [];

  if (secrets && secrets.helloworld) {
    result.push({
      type: 'section',
      text: {type: 'mrkdwn', text: `I FOUND A SECRET!`}
    });
  }

  result.push({
    type: 'section',
    text: {type: 'mrkdwn', text: `Hello, ${name}!`}
  });

  return {
    // Or `ephemeral` for private response
    response_type: 'in_channel', // eslint-disable-line camelcase
    blocks: result
  };
}

/**
 * @typedef {object} SlackBodyType
 * @property {string} text
 * @property {'in_channel'|'ephemeral'} [response_type]
 */
const main = async args => ({
  body: await _command(
    args.params,
    args.commandText,
    args.__secrets || {}
  ).catch(error => ({
    response_type: 'ephemeral',
    text: `Error: ${error.message}`
  }))
});
module.exports = main;
