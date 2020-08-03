/*
    Author: RLNT
    Requested by: Mortis
    License: MIT
    Repository: https://github.com/RLNT/sinus-staff-list
    Resource-Page: https://forum.sinusbot.com/resources/staff-list.497/
    Discord: https://discord.com/invite/Q3qxws6
*/
registerPlugin(
    {
        name: 'Staff List',
        version: '1.5.0',
        description: 'With this script, the bot will automatically keep track of the online status of predefined staff members and post it to a chosen channel description.',
        author: 'RLNT',
        backends: ['ts3'],
        vars: [
            {
                name: 'required',
                title: 'All fields that are marked with (*) are required!'
            },
            {
                name: 'functionality',
                title:
                    "The script stores usernames from people that should of the staff groups. Each client you want to list has to join the server at least once while the script is running. If the script doesn't have any stored clients for a specific group yet, it will not be displayed."
            },
            {
                name: 'configuration',
                title: 'A guide how to configure the script to your needs can be found here: https://github.com/RLNT/sinus-staff-list/blob/master/CONFIGURATION.md'
            },
            {
                name: 'spacer0',
                title: ''
            },
            {
                name: 'header0',
                title: '->>> General Options <<<-'
            },
            {
                name: 'channel',
                title: 'Display-Channel > Define the channel where the staff list should be shown in! (*)',
                type: 'channel'
            },
            {
                name: 'clickable',
                title: 'Clickable-Names > Do you want the usernames in the list to be clickable? They work like hyperlinks then.',
                type: 'select',
                options: ['Yes', 'No']
            },
            {
                name: 'multiple',
                title: 'Show-Multiple-Groups > Do you want clients with multiple relevant groups to be displayed in all of them?',
                type: 'select',
                options: ['Yes', 'No']
            },
            {
                name: 'away',
                title: 'Away-Status > Do you want a third status (besides online & offline) if someone is away/afk?',
                type: 'select',
                options: ['Yes', 'No']
            },
            {
                name: 'awayChannel',
                title: 'Away-Channels > Do you want to set someone away/afk if they join any afk channel?',
                type: 'select',
                options: ['Yes', 'No'],
                indent: 1,
                conditions: [
                    {
                        field: 'away',
                        value: 0
                    }
                ]
            },
            {
                name: 'afkChannels',
                title: 'AFK-Channels > Define a list of channel IDs that should count as AFK-channels! (*)',
                type: 'strings',
                indent: 2,
                conditions: [
                    {
                        field: 'away',
                        value: 0
                    },
                    {
                        field: 'awayChannel',
                        value: 0
                    }
                ]
            },
            {
                name: 'awayMute',
                title: 'Away-Mute > Do you want to count muted clients as away/afk?',
                type: 'checkbox',
                indent: 1,
                conditions: [
                    {
                        field: 'away',
                        value: 0
                    }
                ]
            },
            {
                name: 'awayDeaf',
                title: 'Away-Deaf > Do you want to count deaf clients as away/afk?',
                type: 'checkbox',
                indent: 1,
                conditions: [
                    {
                        field: 'away',
                        value: 0
                    }
                ]
            },
            {
                name: 'removeCommand',
                title:
                    'Remove-Command > Do you want a command to remove clients manually from the staff list? This can be helpful if they were offline when you removed them from a group or for similar situations.',
                type: 'select',
                options: ['Yes', 'No']
            },
            {
                name: 'command',
                title: 'Command > Define the command you want to use to delete a client manually!',
                type: 'string',
                placeholder: '!remove',
                indent: 1,
                conditions: [
                    {
                        field: 'removeCommand',
                        value: 0
                    }
                ]
            },
            {
                name: 'commandServer',
                title: "Server > Do you want the bot to accept the command when it's sent in the server chat?",
                type: 'checkbox',
                indent: 1,
                conditions: [
                    {
                        field: 'removeCommand',
                        value: 0
                    }
                ]
            },
            {
                name: 'commandChannel',
                title: "Channel > Do you want the bot to accept the command when it's sent in the channel chat?",
                type: 'checkbox',
                indent: 1,
                conditions: [
                    {
                        field: 'removeCommand',
                        value: 0
                    }
                ]
            },
            {
                name: 'commandPrivate',
                title: "Private > Do you want the bot to accept the command when it's sent in the private chat?",
                type: 'checkbox',
                indent: 1,
                conditions: [
                    {
                        field: 'removeCommand',
                        value: 0
                    }
                ]
            },
            {
                name: 'commandClients',
                title: 'Clients > Define a list of client IDs that should be allowed to use the command!',
                type: 'strings',
                indent: 1,
                conditions: [
                    {
                        field: 'removeCommand',
                        value: 0
                    }
                ]
            },
            {
                name: 'commandGroups',
                title: 'Groups > Define a list of group IDs that should be allowed to use the command!',
                type: 'strings',
                indent: 1,
                conditions: [
                    {
                        field: 'removeCommand',
                        value: 0
                    }
                ]
            },
            {
                name: 'spacer1',
                title: ''
            },
            {
                name: 'header1',
                title: '->>> Text & Format Options <<<-'
            },
            {
                name: 'format',
                title: 'You can use the normal BB code to format your text like in TeamSpeak.'
            },
            {
                name: 'template',
                title: 'Custom-Template > Do you want to use a custom template to format your staff list?',
                type: 'select',
                options: ['Yes', 'No']
            },
            {
                name: 'tUsername',
                title: 'Username > Define what the name of a client in the list should look like! | placeholders: %name% - name of the client',
                type: 'string',
                placeholder: '[B]%name%[/B]',
                indent: 1,
                conditions: [
                    {
                        field: 'template',
                        value: 0
                    }
                ]
            },
            {
                name: 'tPhraseOnline',
                title: 'Online-Phrase > Define what the phrase if a client is online should look like!',
                type: 'string',
                placeholder: '[COLOR=#00ff00][B]ONLINE[/B][/COLOR]',
                indent: 1,
                conditions: [
                    {
                        field: 'template',
                        value: 0
                    }
                ]
            },
            {
                name: 'tPhraseAway',
                title: 'Away-Phrase > Define what the phrase if a client is away/afk should look like!',
                type: 'string',
                placeholder: '[COLOR=#c8c8c8][B]AWAY[/B][/COLOR]',
                indent: 1,
                conditions: [
                    {
                        field: 'template',
                        value: 0
                    },
                    {
                        field: 'away',
                        value: 0
                    }
                ]
            },
            {
                name: 'tPhraseOffline',
                title: 'Offline-Phrase > Define what the phrase if a client is offline should look like!',
                type: 'string',
                placeholder: '[COLOR=#ff0000][B]OFFLINE[/B][/COLOR]',
                indent: 1,
                conditions: [
                    {
                        field: 'template',
                        value: 0
                    }
                ]
            },
            {
                name: 'tMemberLine',
                title: 'User-Line > Define what a full line in the member list should look like! | placeholders: %name% - formatted username, %status% - formatted status phrase, %lb% - line break',
                type: 'multiline',
                placeholder: '%name% [COLOR=#aaff00]>[/COLOR] %status%',
                indent: 1,
                conditions: [
                    {
                        field: 'template',
                        value: 0
                    }
                ]
            },
            {
                name: 'tGroupSection',
                title: 'Group-Section > Define what a group section should look like! | placeholders: %group% - formatted group name, %users% - formatted member list, %lb% - line break',
                type: 'multiline',
                placeholder: '[center]> %group% <\n%users%\n____________________\n[/center]%lb%',
                indent: 1,
                conditions: [
                    {
                        field: 'template',
                        value: 0
                    }
                ]
            },
            {
                name: 'separator',
                title: 'Separator > Define what the separator between each group section should look like!',
                type: 'multiline',
                placeholder: '_______________________________________',
                indent: 1,
                conditions: [
                    {
                        field: 'template',
                        value: 1
                    }
                ]
            },
            {
                name: 'phraseOnline',
                title: 'Online-Phrase > Define what the phrase if a client is online should look like!',
                type: 'string',
                placeholder: '[COLOR=#00ff00][B]ONLINE[/B][/COLOR]',
                indent: 1,
                conditions: [
                    {
                        field: 'template',
                        value: 1
                    }
                ]
            },
            {
                name: 'phraseAway',
                title: 'Away-Phrase > Define what the phrase if a client is away/afk should look like!',
                type: 'string',
                placeholder: '[COLOR=#c8c8c8][B]AWAY[/B][/COLOR]',
                indent: 1,
                conditions: [
                    {
                        field: 'template',
                        value: 1
                    },
                    {
                        field: 'away',
                        value: 0
                    }
                ]
            },
            {
                name: 'phraseOffline',
                title: 'Offline-Phrase > Define what the phrase if a client is offline should look like!',
                type: 'string',
                placeholder: '[COLOR=#ff0000][B]OFFLINE[/B][/COLOR]',
                indent: 1,
                conditions: [
                    {
                        field: 'template',
                        value: 1
                    }
                ]
            },
            {
                name: 'emptyGroup',
                title: 'Empty-Groups > Do you want to display a custom text for a group in case no one is assigned/stored to it?',
                type: 'select',
                options: ['Yes', 'No']
            },
            {
                name: 'emptyGroupText',
                title: 'Empty-Groups-Text > Define what the text of an empty group should look like! | placeholders: %lb% - line break',
                type: 'multiline',
                placeholder: '[COLOR=#c8c8c8][B]NOT ASSIGNED[/B][/COLOR]',
                indent: 2,
                conditions: [
                    {
                        field: 'emptyGroup',
                        value: 0
                    }
                ]
            },
            {
                name: 'spacer2',
                title: ''
            },
            {
                name: 'header2',
                title: '->>> Group Options <<<-'
            },
            {
                name: 'priority',
                title:
                    'The order in which you define the groups is important! Priority of the groups goes from top to bottom. If a client has two groups, they will be displayed in the group which comes first in the config.'
            },
            {
                name: 'staffGroups',
                title: 'Staff Groups List',
                type: 'array',
                vars: [
                    {
                        name: 'id',
                        title: 'ID > Define the ID of the staff group! (*)',
                        indent: 2,
                        type: 'string',
                        placeholder: '1337'
                    },
                    {
                        name: 'name',
                        title: 'Name > Define the name that should be shown for the group! If not set it will use the default group name.',
                        indent: 2,
                        type: 'multiline',
                        placeholder: '[COLOR=#aa007f][size=12][B]ADMIN[/B][/size][/COLOR]'
                    },
                    {
                        name: 'clients',
                        title: 'Clients > Define a list of additional client IDs that should also count towards this staff group!',
                        indent: 2,
                        type: 'strings'
                    },
                    {
                        name: 'groups',
                        title: 'Groups > Define a list of additional group IDs that should also count towards this staff group!',
                        indent: 2,
                        type: 'strings'
                    }
                ]
            }
        ]
    },
    (_, config) => {
        // DEPENDENCIES
        const engine = require('engine');
        const backend = require('backend');
        const event = require('event');
        const store = require('store');

        // GLOBAL VARS
        let staffClients = [];
        let groupList = [];

        // CONFIG OPTIONS
        const clickable = varDef(config.clickable, 0) == 0;
        const multiple = varDef(config.multiple, 1) == 0;
        const away = varDef(config.away, 1) == 0;
        let awayChannel, awayMute, awayDeaf;
        if (away) {
            awayChannel = varDef(config.awayChannel, 1) == 0;
            awayMute = varDef(config.awayMute, false);
            awayDeaf = varDef(config.awayDeaf, false);
        } else {
            awayChannel = false;
            awayMute = false;
            awayDeaf = false;
        }
        const removeCommand = varDef(config.removeCommand, 1) == 0;
        let command, commandServer, commandChannel, commandPrivate, commandClients, commandGroups;
        if (removeCommand) {
            command = varDef(config.command, '!remove');
            commandServer = varDef(config.commandServer, false);
            commandChannel = varDef(config.commandChannel, false);
            commandPrivate = varDef(config.commandPrivate, false);
            commandClients = varDef(config.commandClients, []);
            commandGroups = varDef(config.commandGroups, []);
        }
        const template = varDef(config.template, 1) == 0;
        let username, userLine, groupSection, separator, phraseOnline, phraseAway, phraseOffline;
        if (template) {
            username = varDef(config.tUsername, '[B]%name%[/B]');
            userLine = varDef(config.tMemberLine, '%name% [COLOR=#aaff00]>[/COLOR] %status%');
            groupSection = varDef(config.tGroupSection, '[center]%group%\n%users%____________________[/center]');
            phraseOnline = varDef(config.tPhraseOnline, '[COLOR=#00ff00][B]ONLINE[/B][/COLOR]');
            phraseAway = varDef(config.tPhraseAway, '[COLOR=#c8c8c8][B]AWAY[/B][/COLOR]');
            phraseOffline = varDef(config.tPhraseOffline, '[COLOR=#ff0000][B]OFFLINE[/B][/COLOR]');
        } else {
            separator = varDef(config.separator, '_______________________________________');
            phraseOnline = varDef(config.phraseOnline, '[COLOR=#00ff00][B]ONLINE[/B][/COLOR]');
            phraseAway = varDef(config.phraseAway, '[COLOR=#c8c8c8][B]AWAY[/B][/COLOR]');
            phraseOffline = varDef(config.phraseOffline, '[COLOR=#ff0000][B]OFFLINE[/B][/COLOR]');
        }
        const emptyGroup = varDef(config.emptyGroup, 1) == 0;
        let emptyGroupText;
        if (emptyGroup) emptyGroupText = varDef(config.emptyGroupText, '[COLOR=#c8c8c8][B]NOT ASSIGNED[/B][/COLOR]');

        // FUNCTIONS
        function log(message) {
            engine.log('Staff-List > ' + message);
        }

        /**
         * Set a default value to a variable in case it's not defined in the config
         * @param {*} configVal > the config variable
         * @param {*} defaultVal > the default value that should be applied if no config value was found or it's empty
         * @returns {*} > the actual result of the variable
         */
        function varDef(configVal, defaultVal) {
            if (configVal === undefined || configVal === null || configVal === '') {
                return defaultVal;
            } else {
                return configVal;
            }
        }

        /**
         * Wait for the backend to be online/connected each given amount of time for a given amount of tries
         * @param {Number} attempts > the amount of tries the function should check for the backend to be online/connected
         * @param {Number} wait > the amount of time (in seconds) that should be waited between each try
         * @returns {Promise} > resolve when the backend is online/connected, reject when the backend was not online/connected in time
         */
        function waitForBackend(attempts, wait) {
            return new Promise((success, fail) => {
                let attempt = 0;
                const timer = setInterval(() => {
                    if (backend.isConnected()) {
                        clearInterval(timer);
                        success();
                    }
                    if (attempt === attempts) {
                        clearInterval(timer);
                        fail();
                    }

                    attempts++;
                }, wait * 1000);
            });
        }

        /**
         * Check all staff groups from the config if their entries are valid and if all IDs
         * reference valid objects on TeamSpeak;
         * Otherwise drop the whole config entry for the runtime
         * @returns {Array} > a list of all valid staff groups objects
         */
        function validateStaffGroups() {
            let staffGroups = [];

            config.staffGroups.forEach(group => {
                if (group.id === undefined || backend.getServerGroupByID(group.id) === undefined) return;
                if (group.clients === undefined || group.clients.length === 0) group.clients = [];
                if (group.groups === undefined || group.groups.length === 0) {
                    group.groups = [group.id];
                } else {
                    group.groups.filter(id => backend.getServerGroupByID(id) !== undefined && id !== group.id);
                    group.groups.push(group.id);
                }
                if (group.name === undefined || group.name === '') {
                    group.name = '[size=12][B]' + backend.getServerGroupByID(group.id).name() + '[/B][/size]';
                }

                groupList = groupList.concat(group.groups);
                staffGroups.push(group);
            });

            return staffGroups;
        }

        /**
         * Validate the script database by checking all entries if they still have a relevant
         * group to list and if they match the current database format;
         * Otherwise drop the whole entry;
         * Database format: <key - uid | entry - nickname, [staff groups]>
         * @returns {void} > nothing
         */
        function validateDatabase() {
            store.getKeys().forEach(key => {
                // delete entries from database which do not contain group objects
                if (Array.isArray(store.get(key)[1])) {
                    if (store.get(key)[1].some(clientGroup => typeof clientGroup !== 'object')) removeClient(key);
                } else {
                    if (typeof store.get(key)[1] !== 'object') removeClient(key);
                }
                // remove all clients from database who do not have a relevant group
                if (store.get(key)[1].some(clientGroup => !groupList.includes(clientGroup.id))) removeClient(key);
            });
        }

        /**
         * Store a client to the script's database if they are not already stored;
         * Can also update information if entry is alreadyp present;
         * @param {String} uid > The UID of the client to store
         * @param {String} nick > The nickname of the client to store
         * @param {Array} groups > The relevant staff groups of the client to store
         * @returns {void} > nothing
         */
        function storeClient(uid, nick, groups) {
            if (!store.getKeys().includes(uid)) {
                store.set(uid, [nick, groups]);
            } else if (store.get(uid)[0] !== nick) {
                store.unset(uid);
                store.set(uid, [nick, groups]);
            } else if (store.get(uid)[1] !== groups) {
                store.unset(uid);
                store.set(uid, [nick, groups]);
            } else {
                return;
            }
            updateStaffClients();
        }

        /**
         * Remove a client from the script's database if they are stored;
         * Will give feedback if the entry was removed
         * @param {String} uid > The UID of the client to remove
         * @returns {Boolean} > True if the client was removed, False if no entry was found
         */
        function removeClient(uid) {
            if (store.getKeys().includes(uid)) {
                store.unset(uid);
                updateStaffClients();
                return true;
            } else {
                return false;
            }
        }

        /**
         * Update the global list of staff clients with an easier to access format;
         * Accessing a variable is also faster than reading everything from the script storage
         * @returns {void} > nothing
         */
        function updateStaffClients() {
            let list = [];
            const keys = store.getKeys();
            keys.forEach(key => {
                list.push([key, store.get(key)[0], store.get(key)[1]]);
            });

            staffClients = list;
        }

        function getStaffGroupsFromClient(client, staffGroups) {
            let clientStaffGroups = [];
            for (let staffGroup of staffGroups) {
                if (isStaffClient(client, staffGroup.clients) || hasStaffGroup(client, staffGroup.groups)) {
                    clientStaffGroups.push(staffGroup);
                }
            }
            if (clientStaffGroups.length === 0) return null;

            return clientStaffGroups;
        }

        function isStaffClient(client, clients) {
            return clients.includes(client.uid());
        }

        function hasStaffGroup(client, groups) {
            for (let clientGroup of client.getServerGroups()) {
                if (groups.includes(clientGroup.id())) return true;
            }

            return false;
        }

        function isAway(client) {
            return client.isAway() || (awayMute && client.isMuted()) || (awayDeaf && client.isDeaf()) || (awayChannel && isInAfkChannel(client));
        }

        function isInAfkChannel(client) {
            for (let channel of client.getChannels()) {
                if (config.afkChannels.includes(channel.id())) return true;
            }

            return false;
        }

        function getFormattedUsername(staffClient) {
            if (clickable) {
                return `[URL=client://0/${staffClient[0]}]${staffClient[1]}[/URL]`;
            } else {
                return staffClient[1];
            }
        }

        function getFormattedUserLine(name, status) {
            let formattedName = '';
            if (template) {
                formattedName = userLine.replace('%name%', username.replace('%name%', name)).replace('%lb%', '\n');
            } else {
                formattedName = `${name} - %status%`;
            }

            // 0 = online, 1 = away, 2 = offline
            switch (status) {
                case 0:
                    formattedName = formattedName.replace('%status%', phraseOnline);
                    break;
                case 1:
                    formattedName = formattedName.replace('%status%', phraseAway);
                    break;
                case 2:
                    formattedName = formattedName.replace('%status%', phraseOffline);
                    break;
            }

            return formattedName;
        }

        function getSortedStaffList() {
            let staffOnline = [];
            let staffAway = [];
            let staffOffline = [];
            staffClients.forEach(staffClient => {
                const client = backend.getClientByUID(staffClient[0]);
                if (client !== undefined) {
                    if (away) {
                        if (isAway(client)) {
                            staffAway.push(staffClient);
                        } else {
                            staffOnline.push(staffClient);
                        }
                    } else {
                        staffOnline.push(staffClient);
                    }
                } else {
                    staffOffline.push(staffClient);
                }
            });
            staffOnline.sort((a, b) => {
                if (a[1].toLowerCase() < b[1].toLowerCase()) return -1;
                if (a[1].toLowerCase() > b[1].toLowerCase()) return 1;
                return 0;
            });
            staffAway.sort((a, b) => {
                if (a[1].toLowerCase() < b[1].toLowerCase()) return -1;
                if (a[1].toLowerCase() > b[1].toLowerCase()) return 1;
                return 0;
            });
            staffOffline.sort((a, b) => {
                if (a[1].toLowerCase() < b[1].toLowerCase()) return -1;
                if (a[1].toLowerCase() > b[1].toLowerCase()) return 1;
                return 0;
            });

            return [staffOnline, staffAway, staffOffline];
        }

        function updateDescription(staffGroups, channel) {
            const [staffOnline, staffAway, staffOffline] = getSortedStaffList();
            let description = '';
            staffGroups.forEach(staffGroup => {
                let staffClientsToList = '';
                if (multiple) {
                    staffOnline.forEach(staffClient => {
                        if (staffClient[2].some(group => group.id === staffGroup.id)) {
                            const staffClientFormatted = getFormattedUsername(staffClient);
                            const staffClientToList = getFormattedUserLine(staffClientFormatted, 0);
                            staffClientsToList += `${staffClientToList}\n`;
                        }
                    });
                    staffAway.forEach(staffClient => {
                        if (staffClient[2].some(group => group.id === staffGroup.id)) {
                            const staffClientFormatted = getFormattedUsername(staffClient);
                            const staffClientToList = getFormattedUserLine(staffClientFormatted, 1);
                            staffClientsToList += `${staffClientToList}\n`;
                        }
                    });
                    staffOffline.forEach(staffClient => {
                        if (staffClient[2].some(group => group.id === staffGroup.id)) {
                            const staffClientFormatted = getFormattedUsername(staffClient);
                            const staffClientToList = getFormattedUserLine(staffClientFormatted, 2);
                            staffClientsToList += `${staffClientToList}\n`;
                        }
                    });
                } else {
                    staffOnline.forEach(staffClient => {
                        if (staffGroup.id === staffClient[2][0].id) {
                            const staffClientFormatted = getFormattedUsername(staffClient);
                            const staffClientToList = getFormattedUserLine(staffClientFormatted, 0);
                            staffClientsToList += `${staffClientToList}\n`;
                        }
                    });
                    staffAway.forEach(staffClient => {
                        if (staffGroup.id === staffClient[2][0].id) {
                            const staffClientFormatted = getFormattedUsername(staffClient);
                            const staffClientToList = getFormattedUserLine(staffClientFormatted, 1);
                            staffClientsToList += `${staffClientToList}\n`;
                        }
                    });
                    staffOffline.forEach(staffClient => {
                        if (staffGroup.id === staffClient[2][0].id) {
                            const staffClientFormatted = getFormattedUsername(staffClient);
                            const staffClientToList = getFormattedUserLine(staffClientFormatted, 2);
                            staffClientsToList += `${staffClientToList}\n`;
                        }
                    });
                }

                if (staffClientsToList === '') {
                    if (!emptyGroup) return;
                    description += `${staffGroup.name}\n`;
                    description += emptyGroupText.replace('%lb%', '\n');
                } else {
                    if (template) {
                        description += groupSection
                            .replace('%group%', staffGroup.name)
                            .replace('%users%', staffClientsToList.substring(0, staffClientsToList.length - 1))
                            .replace('%lb%', '\n');
                    } else {
                        description += `${staffGroup.name}\n${staffClientsToList}${separator}\n`;
                    }
                }
            });

            // set new description to channel
            channel.setDescription(description);
        }

        // LOADING EVENT
        event.on('load', () => {
            if (config.channel === undefined) {
                log('There was no channel selected to display the staff list! Deactivating script...');
                return;
            } else if (awayChannel && config.afkChannels === undefined) {
                log('There were no afk channels set up although the afk channel option is enabled! Deactivating the script...');
                return;
            } else if (config.staffGroups === undefined || config.staffGroups.length === 0) {
                log('There are no staff groups configured to be displayed in the staff list! Deactivating script...');
                return;
            } else if (removeCommand && commandClients.length === 0 && commandGroups.length === 0) {
                log("There are no clients whitelisted for the remove command although it's enabled! Deactivating script...");
                return;
            } else if (removeCommand && !commandServer && !commandChannel && !commandPrivate) {
                log('There is no text channel selected for the bot to listen to commands! Deactivating script...');
                return;
            } else {
                log('The script has loaded successfully!');

                // start the script
                waitForBackend()
                    .then(() => {
                        main();
                    })
                    .catch(() => {
                        log("The script couldn't be loaded because the backend was not online in time! Deactivating script...");
                    });
            }
        });

        // MAIN FUNCTION
        function main() {
            // VARIABLES
            const staffGroups = validateStaffGroups();
            const channel = backend.getChannelByID(config.channel);

            // validate database
            validateDatabase();

            // store all online listed staff clients
            backend.getClients().forEach(client => {
                const clientStaffGroups = getStaffGroupsFromClient(client, staffGroups);
                if (clientStaffGroups !== null) {
                    storeClient(client.uid(), client.nick(), clientStaffGroups);
                } else {
                    removeClient(client.uid());
                }
            });

            // update the cached member list
            updateStaffClients();

            // update the description for all currently known staff clients
            updateDescription(staffGroups, channel);

            // MOVE EVENT
            event.on('clientMove', event => {
                const client = event.client;
                if (client.isSelf()) return;
                const fromChannel = event.fromChannel;
                const toChannel = event.toChannel;
                const uid = client.uid();
                const nick = client.nick();
                const groups = getStaffGroupsFromClient(client, staffGroups);

                // make sure it's a client that has to be listed
                if (groups !== null) {
                    // on connect or disconnect
                    if (fromChannel === undefined || toChannel === undefined) {
                        // make sure client is stored
                        storeClient(uid, nick, groups);

                        // update the description
                        updateDescription(staffGroups, channel);
                    }

                    // on afk channel join or leave
                    if (awayChannel && ((fromChannel !== undefined && config.afkChannels.includes(fromChannel.id())) || (toChannel !== undefined && config.afkChannels.includes(toChannel.id())))) {
                        updateDescription(staffGroups, channel);
                    }
                } else {
                    // if client has no list group but is in the database, delete them
                    if (removeClient(uid)) {
                        updateDescription(staffGroups, channel);
                    }
                }
            });

            // AFK EVENT
            event.on('clientAway', client => {
                if (!away) return;
                if (client.isSelf()) return;
                if (getStaffGroupsFromClient(client, staffGroups) !== null) updateDescription(staffGroups, channel);
            });

            // UN-AFK EVENT
            event.on('clientBack', client => {
                if (!away) return;
                if (client.isSelf()) return;
                if (getStaffGroupsFromClient(client, staffGroups) !== null) updateDescription(staffGroups, channel);
            });

            // MUTE EVENT
            event.on('clientMute', client => {
                if (!away) return;
                if (!awayMute) return;
                if (client.isSelf()) return;
                if (getStaffGroupsFromClient(client, staffGroups) !== null) updateDescription(staffGroups, channel);
            });

            // UNMUTE EVENT
            event.on('clientUnmute', client => {
                if (!away) return;
                if (!awayMute) return;
                if (client.isSelf()) return;
                if (getStaffGroupsFromClient(client, staffGroups) !== null) updateDescription(staffGroups, channel);
            });

            // DEAF EVENT
            event.on('clientDeaf', client => {
                if (!away) return;
                if (!awayDeaf) return;
                if (client.isSelf()) return;
                if (getStaffGroupsFromClient(client, staffGroups) !== null) updateDescription(staffGroups, channel);
            });

            // UNDEAF EVENT
            event.on('clientUndeaf', client => {
                if (!away) return;
                if (!awayDeaf) return;
                if (client.isSelf()) return;
                if (getStaffGroupsFromClient(client, staffGroups) !== null) updateDescription(staffGroups, channel);
            });

            // SERVER GROUP ADDED EVENT
            event.on('serverGroupAdded', event => {
                const client = event.client;
                if (client.isSelf()) return;
                if (groupList.includes(event.serverGroup.id())) {
                    storeClient(client.uid(), client.nick(), getStaffGroupsFromClient(client, staffGroups));
                    updateDescription(staffGroups, channel);
                }
            });

            // SERVER GROUP REMOVE EVENT
            event.on('serverGroupRemoved', event => {
                const client = event.client;
                if (client.isSelf()) return;
                if (groupList.includes(event.serverGroup.id())) {
                    const groups = getStaffGroupsFromClient(client, staffGroups);

                    if (groups === null) {
                        removeClient(client.uid());
                    } else {
                        storeClient(client.uid(), client.nick(), groups);
                    }
                    updateDescription(staffGroups, channel);
                }
            });

            // CHAT EVENT
            event.on('chat', event => {
                const client = event.client;
                if (client.isSelf()) return;
                const message = event.text;
                if (!message.startsWith(command)) return;

                // check command permission
                let permission = false;
                if (commandClients.length > 0 && commandClients.includes(client.uid())) permission = true;
                if (commandGroups.length > 0) {
                    for (let group of client.getServerGroups()) {
                        if (commandGroups.includes(group.id())) {
                            permission = true;
                            break;
                        }
                    }
                }
                if (!permission) {
                    client.chat("You don't have permission to perform this command!");
                    return;
                }

                // check chat channel
                switch (event.mode) {
                    case 1:
                        // private chat
                        if (!commandPrivate) return;
                        break;
                    case 2:
                        // channel chat
                        if (!commandChannel) return;
                        break;
                    case 3:
                        // server chat
                        if (!commandServer) return;
                        break;
                }

                // perform the actual command
                const uid = message.substring(command.length, message.length).trim();
                if (removeClient(uid)) {
                    client.chat('The client was successfully removed!');
                    updateDescription(staffGroups, channel);
                } else {
                    client.chat('The client was not found in the database! Make sure to send the correct UID.');
                }
            });
        }
    }
);
