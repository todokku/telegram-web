/*! File generated by TLObjects' generator. All changes will be ERASED !*/
const { TLObject } = require('../tlobject');
const { TLRequest } = require('../tlobject');
const struct = require('python-struct');
const { readBigIntFromBuffer,
        readBufferFromBigInt, generateRandomBytes } = require('../../Helpers')


class SaveFilePartRequest extends TLRequest {
    static CONSTRUCTOR_ID = 0xb304a621;
    static SUBCLASS_OF_ID = 0xf5b399ac;

    /**
    :returns Bool: This type has no constructors.
    */
    constructor(args) {
        super();
        args = args || {}
        this.CONSTRUCTOR_ID = 0xb304a621;
        this.SUBCLASS_OF_ID = 0xf5b399ac;

        this.fileId = args.fileId;
        this.filePart = args.filePart;
        this._bytes = args.bytes;
    }
    get bytes() {
        return Buffer.concat([
            Buffer.from("21a604b3","hex"),
            readBufferFromBigInt(this.fileId,8,true,true),
            struct.pack('<i', this.filePart),
            TLObject.serializeBytes(this._bytes),
            ])
        }
    static fromReader(reader) {
        let _file_id;
        let _file_part;
        let _bytes;
        let _x;
        let len;
        _file_id = reader.readLong();
        _file_part = reader.readInt();
        _bytes = reader.tgReadBytes();
        return new this({fileId:_file_id,
	filePart:_file_part,
	bytes:_bytes})
    }
}


class GetFileRequest extends TLRequest {
    static CONSTRUCTOR_ID = 0xb15a9afc;
    static SUBCLASS_OF_ID = 0x6c9bd728;

    /**
    :returns upload.File: Instance of either File, FileCdnRedirect
    */
    constructor(args) {
        super();
        args = args || {}
        this.CONSTRUCTOR_ID = 0xb15a9afc;
        this.SUBCLASS_OF_ID = 0x6c9bd728;

        this.precise = args.precise || null;
        this.location = args.location;
        this.offset = args.offset;
        this.limit = args.limit;
    }
    get bytes() {
        return Buffer.concat([
            Buffer.from("fc9a5ab1","hex"),
            struct.pack('<I', (this.precise === undefined || this.precise === false || this.precise === null) ? 0 : 1),
            this.location.bytes,
            struct.pack('<i', this.offset),
            struct.pack('<i', this.limit),
            ])
        }
    static fromReader(reader) {
        let _flags;
        let _precise;
        let _location;
        let _offset;
        let _limit;
        let _x;
        let len;
        let flags = reader.readInt();

        _precise = Boolean(flags & 1);
        _location = reader.tgReadObject();
        _offset = reader.readInt();
        _limit = reader.readInt();
        return new this({precise:_precise,
	location:_location,
	offset:_offset,
	limit:_limit})
    }
}


class SaveBigFilePartRequest extends TLRequest {
    static CONSTRUCTOR_ID = 0xde7b673d;
    static SUBCLASS_OF_ID = 0xf5b399ac;

    /**
    :returns Bool: This type has no constructors.
    */
    constructor(args) {
        super();
        args = args || {}
        this.CONSTRUCTOR_ID = 0xde7b673d;
        this.SUBCLASS_OF_ID = 0xf5b399ac;

        this.fileId = args.fileId;
        this.filePart = args.filePart;
        this.fileTotalParts = args.fileTotalParts;
        this._bytes = args.bytes;
    }
    get bytes() {
        return Buffer.concat([
            Buffer.from("3d677bde","hex"),
            readBufferFromBigInt(this.fileId,8,true,true),
            struct.pack('<i', this.filePart),
            struct.pack('<i', this.fileTotalParts),
            TLObject.serializeBytes(this._bytes),
            ])
        }
    static fromReader(reader) {
        let _file_id;
        let _file_part;
        let _file_total_parts;
        let _bytes;
        let _x;
        let len;
        _file_id = reader.readLong();
        _file_part = reader.readInt();
        _file_total_parts = reader.readInt();
        _bytes = reader.tgReadBytes();
        return new this({fileId:_file_id,
	filePart:_file_part,
	fileTotalParts:_file_total_parts,
	bytes:_bytes})
    }
}


class GetWebFileRequest extends TLRequest {
    static CONSTRUCTOR_ID = 0x24e6818d;
    static SUBCLASS_OF_ID = 0x68f17f51;

    /**
    :returns upload.WebFile: Instance of WebFile
    */
    constructor(args) {
        super();
        args = args || {}
        this.CONSTRUCTOR_ID = 0x24e6818d;
        this.SUBCLASS_OF_ID = 0x68f17f51;

        this.location = args.location;
        this.offset = args.offset;
        this.limit = args.limit;
    }
    get bytes() {
        return Buffer.concat([
            Buffer.from("8d81e624","hex"),
            this.location.bytes,
            struct.pack('<i', this.offset),
            struct.pack('<i', this.limit),
            ])
        }
    static fromReader(reader) {
        let _location;
        let _offset;
        let _limit;
        let _x;
        let len;
        _location = reader.tgReadObject();
        _offset = reader.readInt();
        _limit = reader.readInt();
        return new this({location:_location,
	offset:_offset,
	limit:_limit})
    }
}


class GetCdnFileRequest extends TLRequest {
    static CONSTRUCTOR_ID = 0x2000bcc3;
    static SUBCLASS_OF_ID = 0xf5ccf928;

    /**
    :returns upload.CdnFile: Instance of either CdnFileReuploadNeeded, CdnFile
    */
    constructor(args) {
        super();
        args = args || {}
        this.CONSTRUCTOR_ID = 0x2000bcc3;
        this.SUBCLASS_OF_ID = 0xf5ccf928;

        this.fileToken = args.fileToken;
        this.offset = args.offset;
        this.limit = args.limit;
    }
    get bytes() {
        return Buffer.concat([
            Buffer.from("c3bc0020","hex"),
            TLObject.serializeBytes(this.fileToken),
            struct.pack('<i', this.offset),
            struct.pack('<i', this.limit),
            ])
        }
    static fromReader(reader) {
        let _file_token;
        let _offset;
        let _limit;
        let _x;
        let len;
        _file_token = reader.tgReadBytes();
        _offset = reader.readInt();
        _limit = reader.readInt();
        return new this({fileToken:_file_token,
	offset:_offset,
	limit:_limit})
    }
}


class ReuploadCdnFileRequest extends TLRequest {
    static CONSTRUCTOR_ID = 0x9b2754a8;
    static SUBCLASS_OF_ID = 0xa5940726;

    /**
    :returns Vector<FileHash>: This type has no constructors.
    */
    constructor(args) {
        super();
        args = args || {}
        this.CONSTRUCTOR_ID = 0x9b2754a8;
        this.SUBCLASS_OF_ID = 0xa5940726;

        this.fileToken = args.fileToken;
        this.requestToken = args.requestToken;
    }
    get bytes() {
        return Buffer.concat([
            Buffer.from("a854279b","hex"),
            TLObject.serializeBytes(this.fileToken),
            TLObject.serializeBytes(this.requestToken),
            ])
        }
    static fromReader(reader) {
        let _file_token;
        let _request_token;
        let _x;
        let len;
        _file_token = reader.tgReadBytes();
        _request_token = reader.tgReadBytes();
        return new this({fileToken:_file_token,
	requestToken:_request_token})
    }
}


class GetCdnFileHashesRequest extends TLRequest {
    static CONSTRUCTOR_ID = 0x4da54231;
    static SUBCLASS_OF_ID = 0xa5940726;

    /**
    :returns Vector<FileHash>: This type has no constructors.
    */
    constructor(args) {
        super();
        args = args || {}
        this.CONSTRUCTOR_ID = 0x4da54231;
        this.SUBCLASS_OF_ID = 0xa5940726;

        this.fileToken = args.fileToken;
        this.offset = args.offset;
    }
    get bytes() {
        return Buffer.concat([
            Buffer.from("3142a54d","hex"),
            TLObject.serializeBytes(this.fileToken),
            struct.pack('<i', this.offset),
            ])
        }
    static fromReader(reader) {
        let _file_token;
        let _offset;
        let _x;
        let len;
        _file_token = reader.tgReadBytes();
        _offset = reader.readInt();
        return new this({fileToken:_file_token,
	offset:_offset})
    }
}


class GetFileHashesRequest extends TLRequest {
    static CONSTRUCTOR_ID = 0xc7025931;
    static SUBCLASS_OF_ID = 0xa5940726;

    /**
    :returns Vector<FileHash>: This type has no constructors.
    */
    constructor(args) {
        super();
        args = args || {}
        this.CONSTRUCTOR_ID = 0xc7025931;
        this.SUBCLASS_OF_ID = 0xa5940726;

        this.location = args.location;
        this.offset = args.offset;
    }
    get bytes() {
        return Buffer.concat([
            Buffer.from("315902c7","hex"),
            this.location.bytes,
            struct.pack('<i', this.offset),
            ])
        }
    static fromReader(reader) {
        let _location;
        let _offset;
        let _x;
        let len;
        _location = reader.tgReadObject();
        _offset = reader.readInt();
        return new this({location:_location,
	offset:_offset})
    }
}

module.exports = {
    SaveFilePartRequest,
    GetFileRequest,
    SaveBigFilePartRequest,
    GetWebFileRequest,
    GetCdnFileRequest,
    ReuploadCdnFileRequest,
    GetCdnFileHashesRequest,
    GetFileHashesRequest,
};
