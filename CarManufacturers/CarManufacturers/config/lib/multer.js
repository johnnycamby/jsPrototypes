
'use strict';

module.exports.profileUploadFileFilter = function(req, file, cb) {

    if (file.mimeType !== 'image/png' && file.mimeType !== 'image/jpg' && file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/gif') {
        return cb(new Error('Only image files are allowed!'), false);
    }

    cb(null, true);
};