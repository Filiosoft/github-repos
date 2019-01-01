# github-repos

Microservice to cache and expose GitHub projects for [this page](https://geteventone.com/oss). Built after [zeit/github-repos](https://github.com/zeit/github-repos).

## Usage

Simply install the dependencies:

```bash
npm install
```

Create the `secrets.yml`:

```bash
echo "TOKEN: github-api-token" > secrets.yml
```

And run the server:

```bash
npm run dev
```

## API

### GET /

**200**: Returns a list of projects as follows

```json
[
  {
    "name": "project-name",
    "description": "The description woot",
    "url": "https://github.com/eventOneHQ/test",
    "stars": 3040,
    "forks": 0,
    "fork": false
  }
]
```

## Contributing

1. [Fork](https://help.github.com/articles/fork-a-repo/) this repository to your own GitHub account and then [clone](https://help.github.com/articles/cloning-a-repository/) it to your local device
2. Follow the [usage section](#usage)
3. Start making changes and open a pull request once they're ready!

## Authors

- Noah Prail ([@noahprail](https://twitter.com/noahprail)) - [eventOne](https://geteventone.com)

_Some of the code is adapted from [zeit/github-repos](https://github.com/zeit/github-repos)._
