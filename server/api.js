const express = require('express')
var router = express.Router();
__path = process.cwd()
const fetch = require('node-fetch')
const fs = require('fs')
const hxz = require('hxz-api')
const { getBuffer } = require('../lib/function')

const { artiNama, artiMimpi, ramalJodoh, nomorHoki, pinterest, igDownloader, lirikLagu, mediafireDl, wikiSearch, happymodSearch, playstore, linkwa, jagokata, herodetails, herolist, styleText, joox, HentaiVid, dafontSearch, dafontDown, apkmody, apkmirror } = require('../scraper/sybagus')

router.get('/artinama', async(req, res) => {
	var nama = req.query.nama
	if (!nama) return res.json({ message: 'masukan parameter nama' })
	var hasil = await artiNama(nama)
	try {
		res.json(hasil)
	} catch(err) {
		console.log(err)
		res.json({ message: 'Ups, error' })
	}
})

router.get('/artimimpi', async(req, res) => {
	var mimpi = req.query.mimpi
	if (!mimpi) return res.json({ message: 'masukan parameter mimpi' })
	var hasil = await artiMimpi(mimpi)
	try {
		res.json(hasil)
	} catch(err) {
		console.log(err)
		res.json({ message: 'Ups, error' })
	}
})

router.get('/nomorhoki', async(req, res) => {
	var nomor = req.query.nomor
	if (!nomor) return res.json({ message: 'masukan parameter nomor' })
	var hasil = await nomorHoki(nomor)
	try {
		res.json(hasil)
	} catch(err) {
		console.log(err)
		res.json({ message: 'Ups, error' })
	}
})

router.get('/ramaljodoh', async(req, res) => {
	var nama = req.query.nama
  var pasangan = req.query.pasangan
	if (!nama) return res.json({ message: 'masukan parameter nama' })
  if (!pasangan) return res.json({ message: 'masukan parameter pasangan' })
	var hasil = await ramalJodoh(nama, pasangan)
	try {
		res.json(hasil)
	} catch(err) {
		console.log(err)
		res.json({ message: 'Ups, error' })
	}
})

router.get('/apkmirror', async(req, res) => {
	var query = req.query.query
	if (!query) return res.json({ message: 'masukan parameter query' })
	var result = await apkmirror(query)
	var result = result.data
	res.json({ result })
})

router.get('/happymod', async(req, res) => {
	var query = req.query.query
	if (!query) return res.json({ message: 'masukan parameter query' })
	var result = await happymodSearch(query)
	res.json({ result })
})

router.get('/google', async(req, res) => {
	var query = req.query.query
	if (!query) return res.json({ message: 'masukan parameter query' })
	var google = require('google-it')
	var result = google({'query' : `${query}`, limit: 20, disableConsole: true }).then(result => {
	res.json({ result })
	})
})

router.get('/linkwa', async(req, res) => {
	var query = req.query.query
	if (!query) return res.json({ message: 'masukan parameter query' })
	var hasil = await hxz.linkwa(query)
	try {
		res.json(hasil)
	} catch(err) {
		console.log(err)
		res.json({ message: 'Ups, error' })
	}
})

router.get('/wikisearch', async(req, res) => {
	var query = req.query.query
	if (!query) return res.json({ message: 'masukan parameter query' })
	var hasil = await wikiSearch(query)
	try {
		res.json(hasil)
	} catch(err) {
		console.log(err)
		res.json({ message: 'Ups, error' })
	}
})

router.get('/jagokata', async(req, res) => {
	var kata = req.query.kata
	if (!kata) return res.json({ message: 'masukan parameter kata' })
	var hasil = await jagokata(kata)
	var result = hasil.data[Math.floor(Math.random() * hasil.data.length)]
	try {
		res.json(result)
	} catch(err) {
		console.log(err)
		res.json({ message: 'Ups, error' })
	}
})

router.get('/liriklagu', async(req, res) => {
	var lagu = req.query.lagu
	if (!lagu) return res.json({ message: 'masukan parameter lagu' })
	var result = await lirikLagu(lagu)
	res.json({ result })
})

router.get('/herodetails', async(req, res) => {
	var hero = req.query.hero
	if (!hero) return res.json({ message: 'masukan parameter hero' })
	var result = await herodetails(hero)
	res.json({ result })
})

router.get('/herolist', async(req, res) => {
	var hasil = await herolist()
	try {
		res.json(hasil)
	} catch(err) {
		console.log(err)
		res.json({ message: 'Ups, error' })
	}
})

router.get('/styletext', async(req, res) => {
	var text = req.query.text
	if (!text) return res.json({ message: 'masukan parameter text' })
	res.json(Object.entries(await styleText(text)).map(([name, value]) => `_${name}_ : ${value}`).join`\n\n`)
})

//Downloader
router.get('/instagram', async(req, res) => {
	var link = req.query.link
	if (!link) return res.json({ message: 'masukan parameter Link' })
	var hasil = await igDownloader(link)
	try {
		res.json(hasil)
	} catch(err) {
		console.log(err)
		res.json({ message: 'Ups, error' })
	}
})

//Random Text
router.get('/bucin', async(req, res) => {
	fetch(encodeURI(`https://raw.githubusercontent.com/BochilTeam/database/master/kata-kata/bucin.json`))
        .then(response => response.json())
        .then(data => {
        	var result = data[Math.floor(Math.random() * data.length)];
	try {
		res.json(result)
		})
	} catch(err) {
		console.log(err)
		res.json({ message: 'internal server error, silahkan chat owner' })
	}
})

router.get('/dare', async(req, res) => {
	fetch(encodeURI(`https://raw.githubusercontent.com/BochilTeam/database/master/kata-kata/dare.json`))
        .then(response => response.json())
        .then(data => {
        	var result = data[Math.floor(Math.random() * data.length)];
	try {
		res.json(result)
		})
	} catch(err) {
		console.log(err)
		res.json({ message: 'internal server error, silahkan chat owner' })
	}
})

router.get('/truth', async(req, res) => {
	fetch(encodeURI(`https://raw.githubusercontent.com/BochilTeam/database/master/kata-kata/truth.json`))
        .then(response => response.json())
        .then(data => {
        	var result = data[Math.floor(Math.random() * data.length)];
	try {
		res.json(result)
		})
	} catch(err) {
		console.log(err)
		res.json({ message: 'internal server error, silahkan chat owner' })
	}
})

module.exports = router
