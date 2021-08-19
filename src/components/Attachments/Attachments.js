import React from 'react';
import { FormattedMessage } from 'react-intl';
import { mergeClasses } from '@magento/venia-ui/lib/classify';
import moduleClasses from './Attachments.css';
import AttachmentsItems from './AttachmentsItems';

const defaultValues = {
	block_title: "File Downloads Block Title",
	downloads_count: "Downloads",
}

const Attachments = props => {
    const {attachmentsData, propClasses} = props;
    const classes = mergeClasses(moduleClasses, propClasses);

    if (!attachmentsData || !attachmentsData.items) return null; // check is items exist

    let defaultMessage;
    if (attachmentsData.block_title !== "") defaultMessage = attachmentsData.block_title;
    else defaultMessage = defaultValues.block_title;

    return (
        <section className={`${classes.section} ${classes.attachments}`}>
            <h2 className={`${classes.sectionTitle} ${classes.attachmentsTitle}`}>
            <FormattedMessage
                id="mw_attachments"
                defaultMessage={defaultMessage}
            />
            </h2>
            <AttachmentsItems attachmentsData={attachmentsData} defaultValues={defaultValues} propClasses={propClasses}/>
        </section>
    )
};

export default Attachments;
