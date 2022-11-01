const qrcode = require('qrcode')
const User = require('./model')
const canvas = require('canvas')

const genCode = async(req, res, next) => {
   try { 
    const userId = await User.findById(req.params.id)
    res.json(id._id);

    let input_text = 'Hey boy!!!';

    const code = qrcode.toDataURL(input_text, (err, src) => {
        res.send({
            qr_code: src, 
        })
    })


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