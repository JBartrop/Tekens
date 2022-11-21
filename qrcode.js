const qrcode = require('qrcode')
const User = require('./model')
const canvas = require('canvas')

const genCode = async(req, res, next) => {
   try { 
    const userId = await User.findById(req.params.id)
    res.json(id._id);

    let input_text = 'https://hqstaff.newpatrioticparty.org/index.php?id=NPP-HQSTAFF-2022-0072';

    // const code = qrcode.toFile(input_text, (err, src) => {
    //     res.send({
    //         qr_code: src, 
    //     })
    // })

    const jar = qrcode.toFile('./qrcode.png', input_text)
    res.send(jar)

//   toCanvas('text', { errorCorrectionLevel: 'H' }, function (err, canvas) {
//         if (err) throw err
        
//         var container = document.getElementById('canvas')
//         container.appendChild(canvas)
//         })
      
    
    // await qrcode.toCanvas(document.getElementById('canvas'))
    // res.send(code)
   }catch (err) {

   }

}


// const canvas = qrcode.toCanvas(document.getElementById('canvas'), 
//     function (error) {
//         if (error) console.error(error)
//         console.log('success!');
//   })



  module.exports = {canvas, genCode}