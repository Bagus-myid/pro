const express = require('express')
var router = express.Router();

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

module.exports = router
