import { check } from 'meteor/check';
import Captions from '/imports/api/captions';
import Logger from '/imports/startup/server/logger';

export default function addCaption(meetingId, padId, locale, name) {
  check(meetingId, String);
  check(padId, String);
  check(locale, String);
  check(name, String);

  const selector = {
    meetingId,
    padId,
  };

  const modifier = {
    meetingId,
    padId,
    locale,
    name,
    ownerId: '',
    readOnlyPadId: '',
    data: '',
    revs: 0,
    length: 0,
  };

  try {
    const { insertedId, numberAffected } = Captions.upsert(selector, modifier);

    if (insertedId) {
      Logger.verbose('Captions: added locale', { locale, meetingId });
    } else if (numberAffected) {
      Logger.verbose('Captions: upserted locale', { locale, meetingId });
    }
  } catch (err) {
    Logger.error(`Adding caption to collection: ${err}`);
  }
}
