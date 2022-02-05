const express = require('express')
var router = express.Router();
__path = process.cwd()
const fetch = require('node-fetch')
const fs = require('fs')
const hxz = require('hxz-api')
const { getBuffer } = require('../lib/function')
const axios = require('axios')
const { spawn, exec } = require('child_process')

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
const { scdl, savetik } = require('../scraper/index') 
const { dl } = require('../scraper/aiovideodl')

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

//news
router.get('/bbc', async(req, res) => {
	result = await BBC()
	res.json(result)
})

router.get('/inews', async(req, res) => {
	result = await iNewsTV_()
	res.json(result)
})

router.get('/cnn', async(req, res) => {
	result = await CNN_()
	res.json(result)
})

router.get('/tribun', async(req, res) => {
	result = await Tribun_()
	res.json(result)
})

router.get('/daily', async(req, res) => {
	result = await DailyNews_()
	res.json(result)
})

router.get('/detik', async(req, res) => {
	result = await DetikNews_()
	res.json(result)
})

router.get('/okezone', async(req, res) => {
	result = await Okezone_()
	res.json(result)
})

router.get('/cnbc', async(req, res) => {
	result = await CNBC_()
	res.json(result)
})

router.get('/fajar', async(req, res) => {
	result = await KoranFajar_()
	res.json(result)
})

router.get('/kompas', async(req, res) => {
	result = await iNewsTV_()
	res.json(result)
})

router.get('/koransindo', async(req, res) => {
	result = await KoranSindo_()
	res.json(result)
})

router.get('/tempo', async(req, res) => {
	result = await TempoNews_()
	res.json(result)
})

router.get('/indozone', async(req, res) => {
	result = await Indozone_()
	res.json(result)
})

router.get('/antara', async(req, res) => {
	result = await AntaraNews_()
	res.json(result)
})

router.get('/kontan', async(req, res) => {
	result = await Kontan_()
	res.json(result)
})

router.get('/merdeka', async(req, res) => {
	result = await Merdeka_()
	res.json(result)
})

//inigame
router.get('/truth', async(req, res) => {
	fetch(encodeURI(`https://raw.githubusercontent.com/BochilTeam/database/master/kata-kata/truth.json`))
        .then(response => response.json())
        .then(data => {
        	var result = data[Math.floor(Math.random() * data.length)];
	res.json(result)
	})
})
router.get('/dare', async(req, res) => {
	fetch(encodeURI(`https://raw.githubusercontent.com/BochilTeam/database/master/kata-kata/dare.json`))
        .then(response => response.json())
        .then(data => {
        	var result = data[Math.floor(Math.random() * data.length)];
	res.json(result)
	})
})

router.get('/game', async(req, res) => {
	var type = req.query.type
	if (!type) return res.json({ message: 'masukan parameter type' })
	fetch(encodeURI(`https://raw.githubusercontent.com/BochilTeam/database/master/games/${type}.json`))
        .then(response => response.json())
        .then(data => {
        	var result = data[Math.floor(Math.random() * data.length)];
	res.json(result)
	})
})
router.get('/facebook', async(req, res) => {
	var link = req.query.link
	if (!link) return res.json({ message: 'masukan parameter Link' })
	var hasil = await dl(link)
	try {
		res.json(hasil)
	} catch(err) {
		console.log(err)
		res.json({ message: 'Ups, error' })
	}
})
router.get('/likee', async(req, res) => {
	var link = req.query.link
	if (!link) return res.json({ message: 'masukan parameter Link' })
	var hasil = await dl(link)
	try {
		res.json(hasil)
	} catch(err) {
		console.log(err)
		res.json({ message: 'Ups, error' })
	}
})
router.get('/twitter', async(req, res) => {
	var link = req.query.link
	if (!link) return res.json({ message: 'masukan parameter Link' })
	var hasil = await hxz.twitter(link)
	try {
		res.json(hasil)
	} catch(err) {
		console.log(err)
		res.json({ message: 'Ups, error' })
	}
})
router.get('/soundcloud', async(req, res) => {
	var link = req.query.link
	if (!link) return res.json({ message: 'masukan parameter Link' })
	var hasil = await scdl(link)
	try {
		res.json(hasil)
	} catch(err) {
		console.log(err)
		res.json({ message: 'Ups, error' })
	}
})

router.get('/blackpink', async(req, res) => {
	var text = req.query.text
	if (!text) return res.json({ message: 'masukan parameter text' })
	const result = (await axios.get(`https://me-bagus.herokuapp.com/api/creator/blackpink?apikey=b&text=${text}`)).data
	data = await getBuffer(result.data)
    await fs.writeFileSync(__path +'/tmp/waifu.png', data)
    await res.sendFile(__path +'/tmp/waifu.png')
    await sleep(3000)
    await fs.unlinkSync(__path + '/tmp/waifu.png')
})

router.get('/neon', async(req, res) => {
	var text = req.query.text
	if (!text) return res.json({ message: 'masukan parameter text' })
	const result = (await axios.get(`https://me-bagus.herokuapp.com/api/creator/neon?apikey=b&text=${text}`)).data
	data = await getBuffer(result.data)
    await fs.writeFileSync(__path +'/tmp/waifu.png', data)
    await res.sendFile(__path +'/tmp/waifu.png')
    await sleep(3000)
    await fs.unlinkSync(__path + '/tmp/waifu.png')
})

router.get('/greenneon', async(req, res) => {
	var text = req.query.text
	if (!text) return res.json({ message: 'masukan parameter text' })
	const result = (await axios.get(`https://me-bagus.herokuapp.com/api/creator/greenneon?apikey=b&text=${text}`)).data
	data = await getBuffer(result.data)
    await fs.writeFileSync(__path +'/tmp/waifu.png', data)
    await res.sendFile(__path +'/tmp/waifu.png')
    await sleep(3000)
    await fs.unlinkSync(__path + '/tmp/waifu.png')
})

router.get('/futureneon', async(req, res) => {
	var text = req.query.text
	if (!text) return res.json({ message: 'masukan parameter text' })
	const result = (await axios.get(`https://me-bagus.herokuapp.com/api/creator/futureneon?apikey=b&text=${text}`)).data
	data = await getBuffer(result.data)
    await fs.writeFileSync(__path +'/tmp/waifu.png', data)
    await res.sendFile(__path +'/tmp/waifu.png')
    await sleep(3000)
    await fs.unlinkSync(__path + '/tmp/waifu.png')
})

router.get('/sandwrite', async(req, res) => {
	var text = req.query.text
	if (!text) return res.json({ message: 'masukan parameter text' })
	const result = (await axios.get(`https://me-bagus.herokuapp.com/api/creator/sandwrite?apikey=b&text=${text}`)).data
	data = await getBuffer(result.data)
    await fs.writeFileSync(__path +'/tmp/waifu.png', data)
    await res.sendFile(__path +'/tmp/waifu.png')
    await sleep(3000)
    await fs.unlinkSync(__path + '/tmp/waifu.png')
})

router.get('/sandsummer', async(req, res) => {
	var text = req.query.text
	if (!text) return res.json({ message: 'masukan parameter text' })
	const result = (await axios.get(`https://me-bagus.herokuapp.com/api/creator/sandsummer?apikey=b&text=${text}`)).data
	data = await getBuffer(result.data)
    await fs.writeFileSync(__path +'/tmp/waifu.png', data)
    await res.sendFile(__path +'/tmp/waifu.png')
    await sleep(3000)
    await fs.unlinkSync(__path + '/tmp/waifu.png')
})

router.get('/sandengraved', async(req, res) => {
	var text = req.query.text
	if (!text) return res.json({ message: 'masukan parameter text' })
	const result = (await axios.get(`https://me-bagus.herokuapp.com/api/creator/sandengraved?apikey=b&text=${text}`)).data
	data = await getBuffer(result.data)
    await fs.writeFileSync(__path +'/tmp/waifu.png', data)
    await res.sendFile(__path +'/tmp/waifu.png')
    await sleep(3000)
    await fs.unlinkSync(__path + '/tmp/waifu.png')
})

router.get('/metaldark', async(req, res) => {
	var text = req.query.text
	if (!text) return res.json({ message: 'masukan parameter text' })
	const result = (await axios.get(`https://me-bagus.herokuapp.com/api/creator/metaldark?apikey=b&text=${text}`)).data
	data = await getBuffer(result.data)
    await fs.writeFileSync(__path +'/tmp/waifu.png', data)
    await res.sendFile(__path +'/tmp/waifu.png')
    await sleep(3000)
    await fs.unlinkSync(__path + '/tmp/waifu.png')
})

router.get('/neonlight', async(req, res) => {
	var text = req.query.text
	if (!text) return res.json({ message: 'masukan parameter text' })
	const result = (await axios.get(`https://me-bagus.herokuapp.com/api/creator/neonlight?apikey=b&text=${text}`)).data
	data = await getBuffer(result.data)
    await fs.writeFileSync(__path +'/tmp/waifu.png', data)
    await res.sendFile(__path +'/tmp/waifu.png')
    await sleep(3000)
    await fs.unlinkSync(__path + '/tmp/waifu.png')
})

router.get('/holographic', async(req, res) => {
	var text = req.query.text
	if (!text) return res.json({ message: 'masukan parameter text' })
	const result = (await axios.get(`https://me-bagus.herokuapp.com/api/creator/holographic?apikey=b&text=${text}`)).data
	data = await getBuffer(result.data)
    await fs.writeFileSync(__path +'/tmp/waifu.png', data)
    await res.sendFile(__path +'/tmp/waifu.png')
    await sleep(3000)
    await fs.unlinkSync(__path + '/tmp/waifu.png')
})

router.get('/text1917', async(req, res) => {
	var text = req.query.text
	if (!text) return res.json({ message: 'masukan parameter text' })
	const result = (await axios.get(`https://me-bagus.herokuapp.com/api/creator/text1917?apikey=b&text=${text}`)).data
	data = await getBuffer(result.data)
    await fs.writeFileSync(__path +'/tmp/waifu.png', data)
    await res.sendFile(__path +'/tmp/waifu.png')
    await sleep(3000)
    await fs.unlinkSync(__path + '/tmp/waifu.png')
})

router.get('/minion', async(req, res) => {
	var text = req.query.text
	if (!text) return res.json({ message: 'masukan parameter text' })
	const result = (await axios.get(`https://me-bagus.herokuapp.com/api/creator/minion?apikey=b&text=${text}`)).data
	data = await getBuffer(result.data)
    await fs.writeFileSync(__path +'/tmp/waifu.png', data)
    await res.sendFile(__path +'/tmp/waifu.png')
    await sleep(3000)
    await fs.unlinkSync(__path + '/tmp/waifu.png')
})

router.get('/deluxesilver', async(req, res) => {
	var text = req.query.text
	if (!text) return res.json({ message: 'masukan parameter text' })
	const result = (await axios.get(`https://me-bagus.herokuapp.com/api/creator/deluxesilver?apikey=b&text=${text}`)).data
	data = await getBuffer(result.data)
    await fs.writeFileSync(__path +'/tmp/waifu.png', data)
    await res.sendFile(__path +'/tmp/waifu.png')
    await sleep(3000)
    await fs.unlinkSync(__path + '/tmp/waifu.png')
})

router.get('/blood', async(req, res) => {
	var text = req.query.text
	if (!text) return res.json({ message: 'masukan parameter text' })
	const result = (await axios.get(`https://me-bagus.herokuapp.com/api/creator/blood?apikey=b&text=${text}`)).data
	data = await getBuffer(result.data)
    await fs.writeFileSync(__path +'/tmp/waifu.png', data)
    await res.sendFile(__path +'/tmp/waifu.png')
    await sleep(3000)
    await fs.unlinkSync(__path + '/tmp/waifu.png')
})

router.get('/blood2', async(req, res) => {
	var text = req.query.text
	if (!text) return res.json({ message: 'masukan parameter text' })
	const result = (await axios.get(`https://me-bagus.herokuapp.com/api/creator/blood2?apikey=b&text=${text}`)).data
	data = await getBuffer(result.data)
    await fs.writeFileSync(__path +'/tmp/waifu.png', data)
    await res.sendFile(__path +'/tmp/waifu.png')
    await sleep(3000)
    await fs.unlinkSync(__path + '/tmp/waifu.png')
})

router.get('/halloween', async(req, res) => {
	var text = req.query.text
	if (!text) return res.json({ message: 'masukan parameter text' })
	const result = (await axios.get(`https://me-bagus.herokuapp.com/api/creator/halloween?apikey=b&text=${text}`)).data
	data = await getBuffer(result.data)
    await fs.writeFileSync(__path +'/tmp/waifu.png', data)
    await res.sendFile(__path +'/tmp/waifu.png')
    await sleep(3000)
    await fs.unlinkSync(__path + '/tmp/waifu.png')
})

router.get('/jokerlogo', async(req, res) => {
	var text = req.query.text
	if (!text) return res.json({ message: 'masukan parameter text' })
	const result = (await axios.get(`https://me-bagus.herokuapp.com/api/creator/jokerlogo?apikey=b&text=${text}`)).data
	data = await getBuffer(result.data)
    await fs.writeFileSync(__path +'/tmp/waifu.png', data)
    await res.sendFile(__path +'/tmp/waifu.png')
    await sleep(3000)
    await fs.unlinkSync(__path + '/tmp/waifu.png')
})

router.get('/firework', async(req, res) => {
	var text = req.query.text
	if (!text) return res.json({ message: 'masukan parameter text' })
	const result = (await axios.get(`https://me-bagus.herokuapp.com/api/creator/firework?apikey=b&text=${text}`)).data
	data = await getBuffer(result.data)
    await fs.writeFileSync(__path +'/tmp/waifu.png', data)
    await res.sendFile(__path +'/tmp/waifu.png')
    await sleep(3000)
    await fs.unlinkSync(__path + '/tmp/waifu.png')
})

router.get('/naturalleaves', async(req, res) => {
	var text = req.query.text
	if (!text) return res.json({ message: 'masukan parameter text' })
	const result = (await axios.get(`https://me-bagus.herokuapp.com/api/creator/naturalleaves?apikey=b&text=${text}`)).data
	data = await getBuffer(result.data)
    await fs.writeFileSync(__path +'/tmp/waifu.png', data)
    await res.sendFile(__path +'/tmp/waifu.png')
    await sleep(3000)
    await fs.unlinkSync(__path + '/tmp/waifu.png')
})

router.get('/bokeh', async(req, res) => {
	var text = req.query.text
	if (!text) return res.json({ message: 'masukan parameter text' })
	const result = (await axios.get(`https://me-bagus.herokuapp.com/api/creator/bokeh?apikey=b&text=${text}`)).data
	data = await getBuffer(result.data)
    await fs.writeFileSync(__path +'/tmp/waifu.png', data)
    await res.sendFile(__path +'/tmp/waifu.png')
    await sleep(3000)
    await fs.unlinkSync(__path + '/tmp/waifu.png')
})

router.get('/toxic', async(req, res) => {
	var text = req.query.text
	if (!text) return res.json({ message: 'masukan parameter text' })
	const result = (await axios.get(`https://me-bagus.herokuapp.com/api/creator/toxic?apikey=b&text=${text}`)).data
	data = await getBuffer(result.data)
    await fs.writeFileSync(__path +'/tmp/waifu.png', data)
    await res.sendFile(__path +'/tmp/waifu.png')
    await sleep(3000)
    await fs.unlinkSync(__path + '/tmp/waifu.png')
})

router.get('/strawberry', async(req, res) => {
	var text = req.query.text
	if (!text) return res.json({ message: 'masukan parameter text' })
	const result = (await axios.get(`https://me-bagus.herokuapp.com/api/creator/strawberry?apikey=b&text=${text}`)).data
	data = await getBuffer(result.data)
    await fs.writeFileSync(__path +'/tmp/waifu.png', data)
    await res.sendFile(__path +'/tmp/waifu.png')
    await sleep(3000)
    await fs.unlinkSync(__path + '/tmp/waifu.png')
})

router.get('/3dbox', async(req, res) => {
	var text = req.query.text
	if (!text) return res.json({ message: 'masukan parameter text' })
	const result = (await axios.get(`https://me-bagus.herokuapp.com/api/creator/3dbox?apikey=b&text=${text}`)).data
	data = await getBuffer(result.data)
    await fs.writeFileSync(__path +'/tmp/waifu.png', data)
    await res.sendFile(__path +'/tmp/waifu.png')
    await sleep(3000)
    await fs.unlinkSync(__path + '/tmp/waifu.png')
})

router.get('/roadwarning', async(req, res) => {
	var text = req.query.text
	if (!text) return res.json({ message: 'masukan parameter text' })
	const result = (await axios.get(`https://me-bagus.herokuapp.com/api/creator/roadwarning?apikey=b&text=${text}`)).data
	data = await getBuffer(result.data)
    await fs.writeFileSync(__path +'/tmp/waifu.png', data)
    await res.sendFile(__path +'/tmp/waifu.png')
    await sleep(3000)
    await fs.unlinkSync(__path + '/tmp/waifu.png')
})

router.get('/breakwall', async(req, res) => {
	var text = req.query.text
	if (!text) return res.json({ message: 'masukan parameter text' })
	const result = (await axios.get(`https://me-bagus.herokuapp.com/api/creator/breakwall?apikey=b&text=${text}`)).data
	data = await getBuffer(result.data)
    await fs.writeFileSync(__path +'/tmp/waifu.png', data)
    await res.sendFile(__path +'/tmp/waifu.png')
    await sleep(3000)
    await fs.unlinkSync(__path + '/tmp/waifu.png')
})

router.get('/icecold', async(req, res) => {
	var text = req.query.text
	if (!text) return res.json({ message: 'masukan parameter text' })
	const result = (await axios.get(`https://me-bagus.herokuapp.com/api/creator/icecold?apikey=b&text=${text}`)).data
	data = await getBuffer(result.data)
    await fs.writeFileSync(__path +'/tmp/waifu.png', data)
    await res.sendFile(__path +'/tmp/waifu.png')
    await sleep(3000)
    await fs.unlinkSync(__path + '/tmp/waifu.png')
})

router.get('/luxury', async(req, res) => {
	var text = req.query.text
	if (!text) return res.json({ message: 'masukan parameter text' })
	const result = (await axios.get(`https://me-bagus.herokuapp.com/api/creator/luxury?apikey=b&text=${text}`)).data
	data = await getBuffer(result.data)
    await fs.writeFileSync(__path +'/tmp/waifu.png', data)
    await res.sendFile(__path +'/tmp/waifu.png')
    await sleep(3000)
    await fs.unlinkSync(__path + '/tmp/waifu.png')
})

router.get('/cloud', async(req, res) => {
	var text = req.query.text
	if (!text) return res.json({ message: 'masukan parameter text' })
	const result = (await axios.get(`https://me-bagus.herokuapp.com/api/creator/cloud?apikey=b&text=${text}`)).data
	data = await getBuffer(result.data)
    await fs.writeFileSync(__path +'/tmp/waifu.png', data)
    await res.sendFile(__path +'/tmp/waifu.png')
    await sleep(3000)
    await fs.unlinkSync(__path + '/tmp/waifu.png')
})

router.get('/summersand', async(req, res) => {
	var text = req.query.text
	if (!text) return res.json({ message: 'masukan parameter text' })
	const result = (await axios.get(`https://me-bagus.herokuapp.com/api/creator/summersand?apikey=b&text=${text}`)).data
	data = await getBuffer(result.data)
    await fs.writeFileSync(__path +'/tmp/waifu.png', data)
    await res.sendFile(__path +'/tmp/waifu.png')
    await sleep(3000)
    await fs.unlinkSync(__path + '/tmp/waifu.png')
})

router.get('/thunder', async(req, res) => {
	var text = req.query.text
	if (!text) return res.json({ message: 'masukan parameter text' })
	const result = (await axios.get(`https://me-bagus.herokuapp.com/api/creator/thunder?apikey=b&text=${text}`)).data
	data = await getBuffer(result.data)
    await fs.writeFileSync(__path +'/tmp/waifu.png', data)
    await res.sendFile(__path +'/tmp/waifu.png')
    await sleep(3000)
    await fs.unlinkSync(__path + '/tmp/waifu.png')
})

router.get('/magma', async(req, res) => {
	var text = req.query.text
	if (!text) return res.json({ message: 'masukan parameter text' })
	const result = (await axios.get(`https://me-bagus.herokuapp.com/api/creator/magma?apikey=b&text=${text}`)).data
	data = await getBuffer(result.data)
    await fs.writeFileSync(__path +'/tmp/waifu.png', data)
    await res.sendFile(__path +'/tmp/waifu.png')
    await sleep(3000)
    await fs.unlinkSync(__path + '/tmp/waifu.png')
})

router.get('/impressive-glitch', async(req, res) => {
	var text = req.query.text
	if (!text) return res.json({ message: 'masukan parameter text' })
	const result = (await axios.get(`https://me-bagus.herokuapp.com/api/creator/iglitch?apikey=b&text=${text}`)).data
	data = await getBuffer(result.data)
    await fs.writeFileSync(__path +'/tmp/waifu.png', data)
    await res.sendFile(__path +'/tmp/waifu.png')
    await sleep(3000)
    await fs.unlinkSync(__path + '/tmp/waifu.png')
})

router.get('/harrypotter', async(req, res) => {
	var text = req.query.text
	if (!text) return res.json({ message: 'masukan parameter text' })
	const result = (await axios.get(`https://me-bagus.herokuapp.com/api/creator/harrypotter?apikey=b&text=${text}`)).data
	data = await getBuffer(result.data)
    await fs.writeFileSync(__path +'/tmp/waifu.png', data)
    await res.sendFile(__path +'/tmp/waifu.png')
    await sleep(3000)
    await fs.unlinkSync(__path + '/tmp/waifu.png')
})

router.get('/foggywindow', async(req, res) => {
	var text = req.query.text
	if (!text) return res.json({ message: 'masukan parameter text' })
	const result = (await axios.get(`https://me-bagus.herokuapp.com/api/creator/foggywindow?apikey=b&text=${text}`)).data
	data = await getBuffer(result.data)
    await fs.writeFileSync(__path +'/tmp/waifu.png', data)
    await res.sendFile(__path +'/tmp/waifu.png')
    await sleep(3000)
    await fs.unlinkSync(__path + '/tmp/waifu.png')
})

router.get('/watercolor', async(req, res) => {
	var text = req.query.text
	if (!text) return res.json({ message: 'masukan parameter text' })
	const result = (await axios.get(`https://me-bagus.herokuapp.com/api/creator/watercolor?apikey=b&text=${text}`)).data
	data = await getBuffer(result.data)
    await fs.writeFileSync(__path +'/tmp/waifu.png', data)
    await res.sendFile(__path +'/tmp/waifu.png')
    await sleep(3000)
    await fs.unlinkSync(__path + '/tmp/waifu.png')
})

router.get('/graffiti', async(req, res) => {
	var text = req.query.text
	if (!text) return res.json({ message: 'masukan parameter text' })
	const result = (await axios.get(`https://me-bagus.herokuapp.com/api/creator/wonderfulgraffiti?apikey=b&text=${text}`)).data
	data = await getBuffer(result.data)
    await fs.writeFileSync(__path +'/tmp/waifu.png', data)
    await res.sendFile(__path +'/tmp/waifu.png')
    await sleep(3000)
    await fs.unlinkSync(__path + '/tmp/waifu.png')
})

router.get('/matrix', async(req, res) => {
	var text = req.query.text
	if (!text) return res.json({ message: 'masukan parameter text' })
	const result = (await axios.get(`https://me-bagus.herokuapp.com/api/creator/matrix?apikey=b&text=${text}`)).data
	data = await getBuffer(result.data)
    await fs.writeFileSync(__path +'/tmp/waifu.png', data)
    await res.sendFile(__path +'/tmp/waifu.png')
    await sleep(3000)
    await fs.unlinkSync(__path + '/tmp/waifu.png')
})

router.get('/sketchtext', async(req, res) => {
	var text = req.query.text
	if (!text) return res.json({ message: 'masukan parameter text' })
	const result = (await axios.get(`https://me-bagus.herokuapp.com/api/creator/sketchtext?apikey=b&text=${text}`)).data
	data = await getBuffer(result.data)
    await fs.writeFileSync(__path +'/tmp/waifu.png', data)
    await res.sendFile(__path +'/tmp/waifu.png')
    await sleep(3000)
    await fs.unlinkSync(__path + '/tmp/waifu.png')
})
router.get('/fiction', async(req, res) => {
	var text = req.query.text
	if (!text) return res.json({ message: 'masukan parameter text' })
	const result = (await axios.get(`https://me-bagus.herokuapp.com/api/creator/fiction?apikey=b&text=${text}`)).data
	data = await getBuffer(result.data)
    await fs.writeFileSync(__path +'/tmp/waifu.png', data)
    await res.sendFile(__path +'/tmp/waifu.png')
    await sleep(3000)
    await fs.unlinkSync(__path + '/tmp/waifu.png')
})

router.get('/greenhorror', async(req, res) => {
	var text = req.query.text
	if (!text) return res.json({ message: 'masukan parameter text' })
	const result = (await axios.get(`https://me-bagus.herokuapp.com/api/creator/greenhorror?apikey=b&text=${text}`)).data
	data = await getBuffer(result.data)
    await fs.writeFileSync(__path +'/tmp/waifu.png', data)
    await res.sendFile(__path +'/tmp/waifu.png')
    await sleep(3000)
    await fs.unlinkSync(__path + '/tmp/waifu.png')
})

router.get('/dropwater', async(req, res) => {
	var text = req.query.text
	if (!text) return res.json({ message: 'masukan parameter text' })
	const result = (await axios.get(`https://me-bagus.herokuapp.com/api/creator/dropwater?apikey=b&text=${text}`)).data
	data = await getBuffer(result.data)
    await fs.writeFileSync(__path +'/tmp/waifu.png', data)
    await res.sendFile(__path +'/tmp/waifu.png')
    await sleep(3000)
    await fs.unlinkSync(__path + '/tmp/waifu.png')
})

router.get('/christmas', async(req, res) => {
	var text = req.query.text
	if (!text) return res.json({ message: 'masukan parameter text' })
	const result = (await axios.get(`https://me-bagus.herokuapp.com/api/creator/christmas?apikey=b&text=${text}`)).data
	data = await getBuffer(result.data)
    await fs.writeFileSync(__path +'/tmp/waifu.png', data)
    await res.sendFile(__path +'/tmp/waifu.png')
    await sleep(3000)
    await fs.unlinkSync(__path + '/tmp/waifu.png')
})

router.get('/3dgradient', async(req, res) => {
	var text = req.query.text
	if (!text) return res.json({ message: 'masukan parameter text' })
	const result = (await axios.get(`https://me-bagus.herokuapp.com/api/creator/3dgradient?apikey=b&text=${text}`)).data
	data = await getBuffer(result.data)
    await fs.writeFileSync(__path +'/tmp/waifu.png', data)
    await res.sendFile(__path +'/tmp/waifu.png')
    await sleep(3000)
    await fs.unlinkSync(__path + '/tmp/waifu.png')
})

router.get('/transformer', async(req, res) => {
	var text = req.query.text
	if (!text) return res.json({ message: 'masukan parameter text' })
	const result = (await axios.get(`https://me-bagus.herokuapp.com/api/creator/transformer?apikey=b&text=${text}`)).data
	data = await getBuffer(result.data)
    await fs.writeFileSync(__path +'/tmp/waifu.png', data)
    await res.sendFile(__path +'/tmp/waifu.png')
    await sleep(3000)
    await fs.unlinkSync(__path + '/tmp/waifu.png')
})

router.get('/pornhub', async(req, res) => {
	var text1 = req.query.text1
	var text2 = req.query.text2
	if (!text1) return res.json({ message: 'masukan parameter text1' })
	if (!text2) return res.json({ message: 'masukan parameter text2' })
	const result = (await axios.get(`https://me-bagus.herokuapp.com/api/creator/pornhub?apikey=b&text1=${text1}&text2=${text2}`)).data
	data = await getBuffer(result.data)
    await fs.writeFileSync(__path +'/tmp/waifu.png', data)
    await res.sendFile(__path +'/tmp/waifu.png')
    await sleep(3000)
    await fs.unlinkSync(__path + '/tmp/waifu.png')
})

router.get('/glitch', async(req, res) => {
	var text1 = req.query.text1
	var text2 = req.query.text2
	if (!text1) return res.json({ message: 'masukan parameter text1' })
	if (!text2) return res.json({ message: 'masukan parameter text2' })
	const result = (await axios.get(`https://me-bagus.herokuapp.com/api/creator/glitch?apikey=b&text1=${text1}&text2=${text2}`)).data
	data = await getBuffer(result.data)
    await fs.writeFileSync(__path +'/tmp/waifu.png', data)
    await res.sendFile(__path +'/tmp/waifu.png')
    await sleep(3000)
    await fs.unlinkSync(__path + '/tmp/waifu.png')
})

router.get('/glitch2', async(req, res) => {
	var text1 = req.query.text1
	var text2 = req.query.text2
	if (!text1) return res.json({ message: 'masukan parameter text1' })
	if (!text2) return res.json({ message: 'masukan parameter text2' })
	const result = (await axios.get(`https://me-bagus.herokuapp.com/api/creator/glitch2?apikey=b&text1=${text1}&text2=${text2}`)).data
	data = await getBuffer(result.data)
    await fs.writeFileSync(__path +'/tmp/waifu.png', data)
    await res.sendFile(__path +'/tmp/waifu.png')
    await sleep(3000)
    await fs.unlinkSync(__path + '/tmp/waifu.png')
})

router.get('/avengers', async(req, res) => {
	var text1 = req.query.text1
	var text2 = req.query.text2
	if (!text1) return res.json({ message: 'masukan parameter text1' })
	if (!text2) return res.json({ message: 'masukan parameter text2' })
	const result = (await axios.get(`https://me-bagus.herokuapp.com/api/creator/avengers?apikey=b&text1=${text1}&text2=${text2}`)).data
	data = await getBuffer(result.data)
    await fs.writeFileSync(__path +'/tmp/waifu.png', data)
    await res.sendFile(__path +'/tmp/waifu.png')
    await sleep(3000)
    await fs.unlinkSync(__path + '/tmp/waifu.png')
})

router.get('/space', async(req, res) => {
	var text1 = req.query.text1
	var text2 = req.query.text2
	if (!text1) return res.json({ message: 'masukan parameter text1' })
	if (!text2) return res.json({ message: 'masukan parameter text2' })
	const result = (await axios.get(`https://me-bagus.herokuapp.com/api/creator/space?apikey=b&text1=${text1}&text2=${text2}`)).data
	data = await getBuffer(result.data)
    await fs.writeFileSync(__path +'/tmp/waifu.png', data)
    await res.sendFile(__path +'/tmp/waifu.png')
    await sleep(3000)
    await fs.unlinkSync(__path + '/tmp/waifu.png')
})

router.get('/ninja', async(req, res) => {
	var text1 = req.query.text1
	var text2 = req.query.text2
	if (!text1) return res.json({ message: 'masukan parameter text1' })
	if (!text2) return res.json({ message: 'masukan parameter text2' })
	const result = (await axios.get(`https://me-bagus.herokuapp.com/api/creator/ninjalogo?apikey=b&text1=${text1}&text2=${text2}`)).data
	data = await getBuffer(result.data)
    await fs.writeFileSync(__path +'/tmp/waifu.png', data)
    await res.sendFile(__path +'/tmp/waifu.png')
    await sleep(3000)
    await fs.unlinkSync(__path + '/tmp/waifu.png')
})

router.get('/marvel', async(req, res) => {
	var text1 = req.query.text1
	var text2 = req.query.text2
	if (!text1) return res.json({ message: 'masukan parameter text1' })
	if (!text2) return res.json({ message: 'masukan parameter text2' })
	const result = (await axios.get(`https://me-bagus.herokuapp.com/api/creator/marvellogo?apikey=b&text1=${text1}&text2=${text2}`)).data
	data = await getBuffer(result.data)
    await fs.writeFileSync(__path +'/tmp/waifu.png', data)
    await res.sendFile(__path +'/tmp/waifu.png')
    await sleep(3000)
    await fs.unlinkSync(__path + '/tmp/waifu.png')
})

router.get('/wolf', async(req, res) => {
	var text1 = req.query.text1
	var text2 = req.query.text2
	if (!text1) return res.json({ message: 'masukan parameter text1' })
	if (!text2) return res.json({ message: 'masukan parameter text2' })
	const result = (await axios.get(`https://me-bagus.herokuapp.com/api/creator/wolflogo?apikey=b&text1=${text1}&text2=${text2}`)).data
	data = await getBuffer(result.data)
    await fs.writeFileSync(__path +'/tmp/waifu.png', data)
    await res.sendFile(__path +'/tmp/waifu.png')
    await sleep(3000)
    await fs.unlinkSync(__path + '/tmp/waifu.png')
})

router.get('/wolf-galaxy', async(req, res) => {
	var text1 = req.query.text1
	var text2 = req.query.text2
	if (!text1) return res.json({ message: 'masukan parameter text1' })
	if (!text2) return res.json({ message: 'masukan parameter text2' })
	const result = (await axios.get(`https://me-bagus.herokuapp.com/api/creator/wolflogogalaxy?apikey=b&text1=${text1}&text2=${text2}`)).data
	data = await getBuffer(result.data)
    await fs.writeFileSync(__path +'/tmp/waifu.png', data)
    await res.sendFile(__path +'/tmp/waifu.png')
    await sleep(3000)
    await fs.unlinkSync(__path + '/tmp/waifu.png')
})

router.get('/3dsteel', async(req, res) => {
	var text1 = req.query.text1
	var text2 = req.query.text2
	if (!text1) return res.json({ message: 'masukan parameter text1' })
	if (!text2) return res.json({ message: 'masukan parameter text2' })
	const result = (await axios.get(`https://me-bagus.herokuapp.com/api/creator/3dsteel?apikey=b&text1=${text1}&text2=${text2}`)).data
	data = await getBuffer(result.data)
    await fs.writeFileSync(__path +'/tmp/waifu.png', data)
    await res.sendFile(__path +'/tmp/waifu.png')
    await sleep(3000)
    await fs.unlinkSync(__path + '/tmp/waifu.png')
})

router.get('/wallgraffiti', async(req, res) => {
	var text1 = req.query.text1
	var text2 = req.query.text2
	if (!text1) return res.json({ message: 'masukan parameter text1' })
	if (!text2) return res.json({ message: 'masukan parameter text2' })
	const result = (await axios.get(`https://me-bagus.herokuapp.com/api/creator/wallgraffiti?apikey=b&text1=${text1}&text2=${text2}`)).data
	data = await getBuffer(result.data)
    await fs.writeFileSync(__path +'/tmp/waifu.png', data)
    await res.sendFile(__path +'/tmp/waifu.png')
    await sleep(3000)
    await fs.unlinkSync(__path + '/tmp/waifu.png')
})

router.get('/coolgraffiti', async(req, res) => {
	var text1 = req.query.text1
	var text2 = req.query.text2
	if (!text1) return res.json({ message: 'masukan parameter text1' })
	if (!text2) return res.json({ message: 'masukan parameter text2' })
	const result = (await axios.get(`https://me-bagus.herokuapp.com/api/creator/coolgraffiti?apikey=b&text1=${text1}&text2=${text2}`)).data
	data = await getBuffer(result.data)
    await fs.writeFileSync(__path +'/tmp/waifu.png', data)
    await res.sendFile(__path +'/tmp/waifu.png')
    await sleep(3000)
    await fs.unlinkSync(__path + '/tmp/waifu.png')
})

//Qrcode
router.get("/qrcode", (req, res) => {
 var qr = require('qr-image')
 var text = req.query.text
 if(!text) return res.json({ message: 'Masukan Kata!' })
 var img = qr.image(text,{size :13});
 res.writeHead(200, {'Content-Type': 'image/png'});
 img.pipe(res);
});

//Meme
router.get('/meme', async (req, res) => {
     const fetch = require('node-fetch')
     const subReddits = ["dankmeme", "meme", "memes"];
     const random = Math.floor(Math.random() * subReddits.length)
     var body = await fetch('https://www.reddit.com/r/' + subReddits[random] + '/random/.json')
     body = await body.json()
     const a = body[0]
     const title = a.data.children[0].data.title
     const url = 'https://reddit.com'+a.data.children[0].data.permalink
     const link = a.data.children[0].data.url_overridden_by_dest
     const ups = a.data.children[0].data.ups
     const comments = a.data.children[0].data.num_comments
     const sub = a.data.children[0].data.subreddit_name_prefixed
     const preview = a.data.children[0].data.preview
     return res.json({
         status: true,
         title: title, 
         url: url, 
         image: link, 
         ups: ups, 
         comments: comments 
    });
 })
 
module.exports = router
