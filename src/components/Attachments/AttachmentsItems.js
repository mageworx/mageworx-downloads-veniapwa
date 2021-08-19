import React from 'react';
import { FormattedMessage } from 'react-intl';
import { mergeClasses } from '@magento/venia-ui/lib/classify';
import RichText from '@magento/venia-ui/lib/components/RichText';
import moduleClasses from './Attachments.css';
import FileIcon from './FileIcon';

const getAttachmentJSX = (attachment, defaultValues, howToDownload, classes) => {
    const attachmentName = attachment.name; // add file name
    const fileSize = attachment.size_str && <span className={classes.fileSize}>({attachment.size_str})</span>; // add file size
    const downloadsNumber = (attachment.downloads_number || attachment.downloads_number === 0) && <span className={classes.downloadsNumber}>({defaultValues.downloads_count} {attachment.downloads_number})</span>; // add file size
    const description = attachment.description && <RichText className={classes.fileDescription} content={attachment.description}/>; // add file description
    let link;
    if(attachment.url === ""){
        howToDownload = howToDownload.replace("%login%", 'login');
        howToDownload = howToDownload.replace("%register%", 'register');
        link = (
            <span className={classes.fileNameWithoutLink}>
                {attachmentName} - {howToDownload}
            </span>
        )
    } else {
        link = (
            <a className={classes.fileName} href={attachment.url} target="_blank" rel="noopener noreferrer">
                {attachmentName}
            </a>
        )
    }
    return (
        <div key={"area" + attachment.id} className={classes.attachmentArea}>
            <div className={classes.attachmentIcon}>
                <FileIcon fileType={attachment.icon_type}/>
            </div>
            <div className={classes.attachmentContent}>
                {link}
                {fileSize}
                {downloadsNumber}
                {description}
            </div>
        </div>
    )
}

const AttachmentsItems = props => {
    const {attachmentsData, defaultValues, propClasses} = props;
    const classes = mergeClasses(moduleClasses, propClasses);

    let attachments_items = []; // jsx result with all attachments

    // if not need to separate by section
    if (attachmentsData.is_group_by_section === false) {
        attachments_items = attachmentsData.items.map((attachment) => getAttachmentJSX(attachment, defaultValues, attachmentsData.how_to_download_message, classes));
    }
    // if need to separate by section
    else {
        const items_by_sections = {}; // object with attachments sepparated by sections
        // filling object
        attachmentsData.items.forEach(elem => {
            if (items_by_sections[elem.section_id] === undefined) items_by_sections[elem.section_id] = {};
            if (items_by_sections[elem.section_id]['items'] === undefined) items_by_sections[elem.section_id]['items'] = {};
            items_by_sections[elem.section_id]['items'][elem.id] = {...elem};
            items_by_sections[elem.section_id].name = elem.section_name;
        });
        for (let section in items_by_sections) {
            const sectionName = items_by_sections[section].name;
            let section_attachments = [];
            for (let attachment_id in items_by_sections[section]['items']) {
                let attachment = items_by_sections[section]['items'][attachment_id];
                // add attachment to section
                section_attachments.push(getAttachmentJSX(attachment, defaultValues, attachmentsData.how_to_download_message, classes));
            }
            // add section with attachments to result jsx array
            attachments_items.push(
                <div key={section + items_by_sections[section].name} className={classes.sectionArea}>
                    <h3 className={`${classes.sectionTitle} ${classes.attachmentsTitle}`}>
                        <FormattedMessage
                            id="mw_attachments"
                            defaultMessage={sectionName}
                        />
                    </h3>
                    {section_attachments}
                </div>
            );
        }
    }
    return attachments_items;
};

export default AttachmentsItems;
