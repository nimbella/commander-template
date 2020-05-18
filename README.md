# Nimbella Commander Template

Use this template to kick-start your command set development.

## Creating Currency Command-set using the template

Let's assume you want to create a `currency` command-set with 1 command, `converter` which converts one currency to another. We can do this by following the following steps

1. Fork a copy of this repo into your account.
2. Clone the repo locally as `currency` or rename it to `currency` after cloning.
3. Open `commands.yaml` and edit it to reflect `currency` command-set containing `converter` command.
4. Your `commands.yaml` might look like this:

```yaml
commands:
  currency:
    description: Convert currency from one to other
```

5. Now we want to add 2 mandatory params to our command which is `from` and `to`, our `commands.yaml` is going to look like this:

```yaml
commands:
  currency:
    description: Convert currency from one to other
    parameters:
      - name: from
      - name: to
```

6. Next, we need to rename files. So under packages directory, rename `hello` to `currency`
7. Under `currency` directory, rename `hello.js` to `converter.js`
8. Edit `converter.js` to add the currency convertor logic. Once this is done, save the file and commit all the contents and push the changes to your repo. This is what the `converter`code might look like:

```js
async function install(pkgs) {
  pkgs = pkgs.join(' ');
  return new Promise((resolve, reject) => {
    const { exec } = require('child_process');
    exec(`npm install ${pkgs}`, (err, stdout, stderr) => {
      if (err) reject(err);
      else resolve();
    });
  });
}

async function _command(params, commandText, secrets = {}) {
  const {
    from,
    to
  } = params;

  let packages = [ 'exchange-rates-api' ];
  await install(packages);

  const { convert } = require('exchange-rates-api');
  let amount = await convert(1, from, to);

  return {
    response_type: 'in_channel', // or `ephemeral` for private response
    text: '1 ' + from + ' is equal to ' + amount + ' ' + to
  };
```

9. You can then install your command-set by running the following command `/nc csm_install github:user/currency`

## Running & Debugging your command-set

1. You can run the converter command with `/nc converter`
2. You can make changes on the online editor with `/nc command_code converter`
3. Make sure you commit any changes to your github command-set. The changes can updated with `/nc csm_update currency`
4. Any logs you add within the command can be seen by running `/nc activation_log` _after_ running your command. This might help in fixing bugs
