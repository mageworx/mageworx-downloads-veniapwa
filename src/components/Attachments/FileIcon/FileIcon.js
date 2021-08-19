import React from 'react';
import FileDefault from './icons/206-attachment.svg';
import FilePdf from './icons/480-file-pdf.svg';
import FileDoc from './icons/482-file-word.svg';
import FileImg from './icons/040-file-picture.svg';
import FileZip from './icons/044-file-zip.svg';
import FileExl from './icons/483-file-excel.svg';
import FileYou from './icons/414-youtube.svg';
import FileTxt from './icons/039-file-text2.svg';
import FileVid from './icons/043-file-video.svg';

const FileIcon = props => {
    const { fileType } = props;
    let FileImage;

    switch (fileType) {
        case "pdf":
            FileImage = FilePdf;
            break;
        case "doc":
            FileImage = FileDoc;
            break;
        case "docx":
            FileImage = FileDoc;
            break;
        case "png":
            FileImage = FileImg;
            break;
        case "jpg":
            FileImage = FileImg;
            break;
        case "jpeg":
            FileImage = FileImg;
            break;
        case "zip":
            FileImage = FileZip;
            break;
        case "rar":
            FileImage = FileZip;
            break;
        case "7z":
            FileImage = FileZip;
            break;
        case "xls":
            FileImage = FileExl;
            break;
        case "xlsx":
            FileImage = FileExl;
            break;
        case "youtube":
            FileImage = FileYou;
            break;
        case "txt":
            FileImage = FileTxt;
            break;
        case "txt":
            FileImage = FileTxt;
            break;
        case "mp4":
            FileImage = FileVid;
            break;
        case "mov":
            FileImage = FileVid;
            break;
        case "wmv":
            FileImage = FileVid;
            break;
        case "avi":
            FileImage = FileVid;
            break;
        default:
            FileImage = FileDefault;
    }
    return <img src={FileImage} width="16" height="16" alt="Attachment" />;
};

export default FileIcon;
