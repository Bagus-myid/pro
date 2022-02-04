const express = require('express')
var router = express.Router();
__path = process.cwd()
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
	var result = hasil.wiki
	try {
		res.json(result)
	} catch(err) {
		console.log(err)
		res.json({ message: 'Ups, error' })
	}
})

router.get('/liriklagu', async(req, res) => {
	var query = req.query.query
	if (!query) return res.json({ message: 'masukan parameter query' })
	var hasil = await lirikLagu(query)
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

router.get('/herodetail', async(req, res) => {
	var hero = req.query.hero
	if (!hero) return res.json({ message: 'masukan parameter hero' })
	var hasil = await herodetails(hero)
	try {
		res.json(hasil)
	} catch(err) {
		console.log(err)
		res.json({ message: 'Ups, error' })
	}
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

module.exports = router
