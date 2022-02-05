const express = require('express')
var router = express.Router();
__path = process.cwd()
const fetch = require('node-fetch')
const fs = require('fs')
const hxz = require('hxz-api')
const { getBuffer } = require('../lib/function')
const axios = require('axios')
const { spawn } = require('child_process')

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
} = require('../scraper/news')

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

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
	res.json(result.result)
})

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

router.get('/dafont', async(req, res) => {
	var query = req.query.query
	if (!query) return res.json({ message: 'masukan parameter query' })
	var result = await dafontSearch(query)
	res.json({result})
})

router.get('/dafontdl', async(req, res) => {
	var link = req.query.link
	if (!link) return res.json({ message: 'masukan parameter Link' })
	var hasil = await dafontDown(link)
	try {
		res.json(hasil)
	} catch(err) {
		console.log(err)
		res.json({ message: 'Ups, error' })
	}
})

router.get('/hentai-video', async(req, res) => {
	var result = await HentaiVid()
	res.json(result.hasil)
})

router.get('/bucin', async(req, res) => {
	fetch(encodeURI(`https://raw.githubusercontent.com/BochilTeam/database/master/kata-kata/bucin.json`))
        .then(response => response.json())
        .then(data => {
        	var result = data[Math.floor(Math.random() * data.length)];
	res.json(result)
	})
})

router.get('/kisahnabi', async(req, res) => {
	var nabi = req.query.nabi
	if (!nabi) return res.json({ message: 'masukan parameter nabi' })
	fetch(encodeURI(`https://raw.githubusercontent.com/bulansutena/Database-1/904eec390ea11805cc23922bfb1dc6abb4684302/kisahnabi/${nabi}.json`))
        .then(response => response.json())
        .then(data => {
	res.json(data)
	})
})

//vokal
router.get('/halah', async(req, res) => {
	var text = req.query.text
	if (!text) return res.json({ message: 'masukan parameter text' })
	var result =  text.replace(/[aiueo]/g, 'a').replace(/[AIUEO]/g, 'A')
	res.json(result)
})

router.get('/hilih', async(req, res) => {
	var text = req.query.text
	if (!text) return res.json({ message: 'masukan parameter text' })
	var result =  text.replace(/[aiueo]/g, 'i').replace(/[AIUEO]/g, 'I')
	res.json(result)
})

router.get('/huluh', async(req, res) => {
	var text = req.query.text
	if (!text) return res.json({ message: 'masukan parameter text' })
	var result =  text.replace(/[aiueo]/g, 'u').replace(/[AIUEO]/g, 'U')
	res.json(result)
})

router.get('/heleh', async(req, res) => {
	var text = req.query.text
	if (!text) return res.json({ message: 'masukan parameter text' })
	var result =  text.replace(/[aiueo]/g, 'e').replace(/[AIUEO]/g, 'E')
	res.json(result)
})

router.get('/holoh', async(req, res) => {
	var text = req.query.text
	if (!text) return res.json({ message: 'masukan parameter text' })
	var result =  text.replace(/[aiueo]/g, 'o').replace(/[AIUEO]/g, 'O')
	res.json(result)
})

//RandomImageWithBuffer
router.get('/renungan', async(req, res) => {
	var waif = (await axios.get(`https://raw.githubusercontent.com/BochilTeam/database/master/kata-kata/renungan.json`)).data
	const result = waif[Math.floor(Math.random() * (waif.length))]
	data = await getBuffer(result)
    await fs.writeFileSync(__path +'/tmp/waifu.png', data)
    await res.sendFile(__path +'/tmp/waifu.png')
    await sleep(3000)
    await fs.unlinkSync(__path + '/tmp/waifu.png')
})

router.get('/aesthetic', async(req, res) => {
	var waif = (await axios.get(`https://raw.githubusercontent.com/xdlyy404/api-faza/2338ea3cdec6ae463cb5bed8151bbeaab0871cb6/data/aesthetic.json`)).data
	const result = waif[Math.floor(Math.random() * (waif.length))]
	data = await getBuffer(result)
    await fs.writeFileSync(__path +'/tmp/waifu.png', data)
    await res.sendFile(__path +'/tmp/waifu.png')
    await sleep(3000)
    await fs.unlinkSync(__path + '/tmp/waifu.png')
})

router.get('/cecan', async(req, res) => {
	var waif = (await axios.get(`https://raw.githubusercontent.com/xdlyy404/api-faza/2338ea3cdec6ae463cb5bed8151bbeaab0871cb6/data/cecan.json`)).data
	const result = waif[Math.floor(Math.random() * (waif.length))]
	data = await getBuffer(result)
    await fs.writeFileSync(__path +'/tmp/waifu.png', data)
    await res.sendFile(__path +'/tmp/waifu.png')
    await sleep(3000)
    await fs.unlinkSync(__path + '/tmp/waifu.png')
})

router.get('/cogan', async(req, res) => {
	var waif = (await axios.get(`https://raw.githubusercontent.com/xdlyy404/api-faza/2338ea3cdec6ae463cb5bed8151bbeaab0871cb6/data/cogan.json`)).data
	const result = waif[Math.floor(Math.random() * (waif.length))]
	data = await getBuffer(result)
    await fs.writeFileSync(__path +'/tmp/waifu.png', data)
    await res.sendFile(__path +'/tmp/waifu.png')
    await sleep(3000)
    await fs.unlinkSync(__path + '/tmp/waifu.png')
})

router.get('/darkjoke', async(req, res) => {
	var waif = (await axios.get(`https://raw.githubusercontent.com/bagusganz8/BagusBot-Api/main/Random/darkjoke.json`)).data
	const result = waif[Math.floor(Math.random() * (waif.length))]
	data = await getBuffer(result)
    await fs.writeFileSync(__path +'/tmp/waifu.png', data)
    await res.sendFile(__path +'/tmp/waifu.png')
    await sleep(3000)
    await fs.unlinkSync(__path + '/tmp/waifu.png')
})

router.get('/nuliskiri', async(req, res) => {
	var text = req.query.text
	if (!text) return res.json({ message: 'masukan parameter text' })
splitText = text.replace(/(\S+\s*){1,9}/g, '$&\n')
fixHeight = splitText.split('\n').slice(0, 31).join('\n')
spawn('convert', [
'./lib//buku/sebelumkiri.jpg',
'-font',
'./lib/Indie-Flower.ttf',
'-size',
'960x1280',
'-pointsize',
'22',
'-interline-spacing',
'2',
'-annotate',
'+140+153',
fixHeight,
'./lib/buku/setelahkiri.jpg'
])
.on('error', () => res.json({ message: 'Ups, error' })
.on('exit', () => {
	result = fs.readFileSync('./lib//buku/setelahkiri.jpg')
	data = await getBuffer(result)
    await fs.writeFileSync(__path +'/tmp/waifu.jpg', data)
    await res.sendFile(__path +'/tmp/waifu.jpg')
    await sleep(3000)
    await fs.unlinkSync(__path + '/tmp/waifu.jpg')
    })
})

module.exports = router
