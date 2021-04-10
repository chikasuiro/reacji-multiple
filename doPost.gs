function doPost(e) {
  const VERIFICATION_TOKEN = '[YOUR_VERIFICATION_TOKEN]';
  const url01 = '[INCOMING_WEBHOOK_URL_01]';
  const url02 = '[INCOMING_WEBHOOK_URL_02]';
  const url03 = '[INCOMING_WEBHOOK_URL_03]';
  /*
   * set URLs for more options here
   */

  const json = JSON.parse(e.postData.getDataAsString());
  const event = json.event;

  if (json.token != VERIFICATION_TOKEN) {
    throw new Error('Invalid token.');
  }

  if (json.type == 'event_callback' && event.type == 'reaction_added') {  // MY reacji channeler
    const reaction = event.reaction;
    const user = event.user;
    const channel = event.item.channel;
    const timestamp = event.item.ts.replace('.', '');
    const params = {
      'method': 'post',
      'contentType': 'application/json',
      'payload': JSON.stringify(
        {
          'text': 'Reaction :' + reaction + ': added to '
                  + '<https://[YOUR_WORKSPACE].slack.com/archives/' + channel + '/p' + timestamp + '> '
                  + 'by <@' + user + '>.',
          'unfurl_links': true
        }
      ),
      'muteHttpExceptions': true
    };
    switch (reaction) {
      case '[REACTION_01]':  // option 1
        return UrlFetchApp.fetch(url01, params);
      case '[REACTION_02]':  // option 2
        return UrlFetchApp.fetch(url02, params);
      case '[REACTION_03]':  // option 3
        return UrlFetchApp.fetch(url03, params);
      /*
       * set other options here
       */
      default:
        return null;
    }
  } else if (json.type == 'url_verification') {  // 1st time
    return ContentService.createTextOutput(json.challenge);
  } else {
    return null;
  }
}
