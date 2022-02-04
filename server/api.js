const express = require('express')
var router = express.Router();
__path = process.cwd()
const fetch = require('node-fetch')
const fs = require('fs')
const hxz = require('hxz-api')
const { getBuffer } = require('../lib/function')
const axios = require('axios')

const { artiNama, artiMimpi, ramalJodoh, nomorHoki, pinterest, igDownloader, lirikLagu, mediafireDl, wikiSearch, happymodSearch, playstore, linkwa, jagokata, herodetails, herolist, styleText, joox, HentaiVid, dafontSearch, dafontDown, apkmody, apkmirror } = require('../scraper/sybagus')
const {
  metroTV_, 
  CNN_, 
  iNewsTV_, 
  Kumparan_, 
  Tribun_, 
  DailyNews_, 
  DetikNews_, 
  Okezone_, 
  CNBC_, 
  KoranFajar_, 
  Kompas_, 
  KoranSindo_, 
  TempoNews_, 
  Indozone_, 
  AntaraNews_, 
  Republika_,
  BBC,
  VIVA_,
  Kontan_,
  Merdeka_
} = require('../scraper/news.js')

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

router.get('/namaninja', async(req, res) => {
	var text = req.query.text
	if (!text) return res.json({ message: 'masukan parameter text' })
	res.json(text.replace(/[a-z]/gi, v => {
        switch (v.toLowerCase()) {
            case 'a': return 'ka'
            case 'b': return 'tu'
            case 'c': return 'mi'
            case 'd': return 'te'
            case 'e': return 'ku'
            case 'f': return 'lu'
            case 'g': return 'ji'
            case 'h': return 'ri'
            case 'i': return 'ki'
            case 'j': return 'zu'
            case 'k': return 'me'
            case 'l': return 'ta'
            case 'm': return 'rin'
            case 'n': return 'to'
            case 'o': return 'mo'
            case 'p': return 'no'
            case 'q': return 'ke'
            case 'r': return 'shi'
            case 's': return 'ari'
            case 't': return 'ci'
            case 'u': return 'do'
            case 'v': return 'ru'
            case 'w': return 'mei'
            case 'x': return 'na'
            case 'y': return 'fu'
            case 'z': return 'zi'
        }
    }))
})

router.get('/pinterest', async(req, res) => {
	var query = req.query.query
	if (!query) return res.json({ message: 'masukan parameter query' })
	var result = await pinterest(query)
	res.json({ result })
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

router.get('/mediafire', async(req, res) => {
	var link = req.query.link
	if (!link) return res.json({ message: 'masukan parameter Link' })
	var hasil = await mediafireDl(link)
	try {
		res.json(hasil)
	} catch(err) {
		console.log(err)
		res.json({ message: 'Ups, error' })
	}
})

router.get('/joox', async(req, res) => {
	var query = req.query.query
	if (!query) return res.json({ message: 'masukan parameter query' })
	var res = await joox(query)
	var result = res.data
	res.json({result})
})

router.get('/bbc', async(req, res) => {
	(async() => {
		result = await BBC()
	res.json({result})
	})()
})

router.get('/bucin', async(req, res) => {
	fetch(encodeURI(`https://raw.githubusercontent.com/BochilTeam/database/master/kata-kata/bucin.json`))
        .then(response => response.json())
        .then(data => {
        	var result = data[Math.floor(Math.random() * data.length)];
	res.json(result)
	})
})

module.exports = router
