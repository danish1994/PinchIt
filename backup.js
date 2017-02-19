var mysqlDump = require('mysqldump')
var CronJob = require('cron').CronJob
var fs = require('fs')

var s3 = require('s3')

var client = s3.createClient({
    maxAsyncS3: 20, // this is the default 
    s3RetryCount: 3, // this is the default 
    s3RetryDelay: 1000, // this is the default 
    multipartUploadThreshold: 20971520, // this is the default (20 MB) 
    multipartUploadSize: 15728640, // this is the default (15 MB) 
    s3Options: {
        accessKeyId: "AKIAICF55LTRN4M2NU5Q",
        secretAccessKey: "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",
        region: 'us-west-2'
    },
})

module.exports = function() {
    var job = new CronJob('0 0 0 * * 0', function() {
            fs.unlink('./backup.sql', (err) => {
                if (!err) {
                    console.log('Deleted Old Backup');
                }
            })

            mysqlDump({
                host: 'localhost',
                user: 'root',
                password: 'danish',
                database: 'pinch',
                dest: './backup.sql'
            }, function(err) {
                if (!err) {
                    console.log('Data Saved')
                    let bucket = 'www.pinched.in'
                    let backupName = 'Backup - ' + new Date() + '.sql'
                    console.log(backupName)
                    let params = {
                        localFile: './backup.sql',
                        s3Params: {
                            Bucket: bucket,
                            Key: 'backup/' + backupName,
                        },
                    }

                    var uploader = client.uploadFile(params)

                    uploader.on('error', function(err) {
                        console.error("unable to upload:", err.stack)
                    })

                    // uploader.on('progress', function() {
                    //     console.log("progress", uploader.progressMd5Amount,
                    //         uploader.progressAmount, uploader.progressTotal)
                    // })

                    uploader.on('end', function() {
                        console.log("done uploading")
                    })
                }
            })
        }, function() {

        },
        true
    )
}
