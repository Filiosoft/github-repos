// some of this code is adapted from here: https://github.com/zeit/github-repos/blob/master/index.js

const serverless = require('serverless-http')
const express = require('express')
const app = express()
const fetch = require('node-fetch')
const ms = require('ms')
const cors = require('cors')

app.use(cors())

function log(text) {
    return console.log(text)
}

function logError(res, text, status) {
    console.log(text)
    return res.status(status).send(text)
}

const token = process.env.TOKEN

app.get('/', function (req, res) {
    fetch('https://api.github.com/orgs/Filiosoft/repos?per_page=100', {
            headers: {
                Accept: 'application/vnd.github.preview',
                Authorization: `token ${token}`
            }
        })
        .then(resp => {
            if (resp.status !== 200) {
                return logError(res, 'Non-200 response code from GitHub: ' + resp.status, resp.status)
            }
            return resp.json()
        })
        .then(data_ => {
            if (!data_) {
                return logError(res, 'Missing data', 500)
            }

            // Ugly hack because github sometimes doesn't return
            // all the right search results :|
            let featured = 0
            data_.forEach(({
                name
            }) => {
                if (name === 'filiosoft.github.io' || name === 'gitlab-issue-bot' || name === 'rva-cli') {
                    featured++
                }
            })

            if (featured !== 3) {
                return logError(res, `Error: GitHub did not include all projects (${featured})`, 500)
            }
            const blacklist = ['dockerfiles']

            const data = data_.map(({
                name,
                description,
                stargazers_count,
                fork,
                forks,
                html_url
            }) => ({
                name,
                description,
                url: html_url,
                stars: stargazers_count,
                forks,
                fork
            })).sort((p1, p2) =>
                p2.stars - p1.stars
            ).filter(p => p.name !== blacklist.find(e => e === p.name))

            return res.json(data)
        })
        .catch(err => {
            return logError(res, 'Error parsing response from GitHub: ' + err.stack, 500)
        })

})

module.exports.handler = serverless(app)