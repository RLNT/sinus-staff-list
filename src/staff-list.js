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
        version: '1.9.0',
        description: 'With this script, the bot will automatically keep track of the online status of predefined staff members and post it to a chosen channel description.',
        author: 'RLNT',
        backends: ['ts3'],
        vars: [
            {
                name: 'required',
                title: 'All fields that are marked with (*) are required, fields with [*] are semi-required and all others are optional and have a default value.'
            },
            {
                name: 'functionality',
                title:
                    "The script stores usernames of clients with relevant groups. Each client you want to list has to join the server at least once while the script is running. A client can't be displayed in the staff list if they are offline and are not stored yet."
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
                title: 'Away-Channels > Do you want to set someone away/afk if they join an afk channel?',
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
                title: "Remove-Command > Do you want a command to remove clients manually from the script's database?",
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
                title: "Server > Do you want the bot listening to the command when it's being sent in the server chat?",
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
                title: "Channel > Do you want the bot listening to the command when it's being sent in the channel chat?",
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
                title: "Private > Do you want the bot listening to the command when it's being sent in the private chat?",
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
                title: 'Clients > Define the list of client IDs that should be allowed to use the command! [*]',
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
                title: 'Groups > Define the list of group IDs that should be allowed to use the command! [*]',
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
                name: 'commandNoPerm',
                title: "Permission-Text > Define the text that should be sent to the command invoker if they don't have permission to use the command!",
                type: 'string',
                placeholder: "You don't have permission to perform this command!",
                indent: 1,
                conditions: [
                    {
                        field: 'removeCommand',
                        value: 0
                    }
                ]
            },
            {
                name: 'commandArgument',
                title: "Missing-Argument-Text > Define the text that should be sent to the command invoker if they didn't pass an argument to the command!",
                type: 'string',
                placeholder: 'Not enough arguments! You have to add a client UID to the command! Usage: !remove <client UID>',
                indent: 1,
                conditions: [
                    {
                        field: 'removeCommand',
                        value: 0
                    }
                ]
            },
            {
                name: 'commandInvalid',
                title: 'Invalid-UID-Text > Define the text that should be sent to the command invoker if the argument they entered is not a valid client UID! | placeholders: %arg% - entered argument',
                type: 'string',
                placeholder: '"%arg%" is not a valid client UID! Make sure to send the correct one.',
                indent: 1,
                conditions: [
                    {
                        field: 'removeCommand',
                        value: 0
                    }
                ]
            },
            {
                name: 'commandNotFound',
                title:
                    "Not-Found-Text > Define the text that should be sent to the command invoker if the target client couldn't be found in the database! | placeholders: %uid% - uid of the target client",
                type: 'string',
                placeholder: 'The client (%uid%) was not found in the database! Make sure to send the correct UID.',
                indent: 1,
                conditions: [
                    {
                        field: 'removeCommand',
                        value: 0
                    }
                ]
            },
            {
                name: 'commandSuccess',
                title: 'Success-Text > Define the text that should be sent to the command invoker if the target client was successfully removed! | placeholders: %uid% - uid of the target client',
                type: 'string',
                placeholder: 'The client (%uid%) was successfully removed!',
                indent: 1,
                conditions: [
                    {
                        field: 'removeCommand',
                        value: 0
                    }
                ]
            },
            {
                name: 'dbRemoveCommand',
                title: 'DB-Remove-Command > Do you want a command to drop/remove the whole database of the script?',
                type: 'select',
                options: ['Yes', 'No']
            },
            {
                name: 'dbCommand',
                title: 'Command > Define the command you want to use to delete the whole database!',
                type: 'string',
                placeholder: '!removedatabase',
                indent: 1,
                conditions: [
                    {
                        field: 'dbRemoveCommand',
                        value: 0
                    }
                ]
            },
            {
                name: 'dbCommandServer',
                title: "Server > Do you want the bot listening to the command when it's being sent in the server chat?",
                type: 'checkbox',
                indent: 1,
                conditions: [
                    {
                        field: 'dbRemoveCommand',
                        value: 0
                    }
                ]
            },
            {
                name: 'dbCommandChannel',
                title: "Channel > Do you want the bot listening to the command when it's being sent in the channel chat?",
                type: 'checkbox',
                indent: 1,
                conditions: [
                    {
                        field: 'dbRemoveCommand',
                        value: 0
                    }
                ]
            },
            {
                name: 'dbCommandPrivate',
                title: "Private > Do you want the bot listening to the command when it's being sent in the private chat?",
                type: 'checkbox',
                indent: 1,
                conditions: [
                    {
                        field: 'dbRemoveCommand',
                        value: 0
                    }
                ]
            },
            {
                name: 'dbCommandClients',
                title: 'Clients > Define the list of client IDs that should be allowed to use the command! [*]',
                type: 'strings',
                indent: 1,
                conditions: [
                    {
                        field: 'dbRemoveCommand',
                        value: 0
                    }
                ]
            },
            {
                name: 'dbCommandGroups',
                title: 'Groups > Define the list of group IDs that should be allowed to use the command! [*]',
                type: 'strings',
                indent: 1,
                conditions: [
                    {
                        field: 'dbRemoveCommand',
                        value: 0
                    }
                ]
            },
            {
                name: 'dbCommandNoPerm',
                title: "Permission-Text > Define the text that should be sent to the command invoker if they don't have permission to use the command!",
                type: 'string',
                placeholder: "You don't have permission to perform this command!",
                indent: 1,
                conditions: [
                    {
                        field: 'removeCommand',
                        value: 0
                    }
                ]
            },
            {
                name: 'dbCommandEmpty',
                title: 'Empty-Database-Text > Define the text that should be sent to the command invoker if database is already empty!',
                type: 'string',
                placeholder: 'The database is already empty!',
                indent: 1,
                conditions: [
                    {
                        field: 'removeCommand',
                        value: 0
                    }
                ]
            },
            {
                name: 'dbCommandSuccess',
                title:
                    'Success-Text > Define the text that should be sent to the command invoker if the database was successfully dropped/removed! | placeholders: %amount% - amount of database removals',
                type: 'string',
                placeholder: 'The database was successfully dropped! %amount% entries have been removed.',
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
                title: 'You can use the normal BB code to format your text, like in TeamSpeak.'
            },
            {
                name: 'template',
                title: 'Custom-Template > Do you want to use a custom template to format your staff list?',
                type: 'select',
                options: ['Yes', 'No']
            },
            {
                name: 'tUsername',
                title: 'Username > Define what the name of a client in the staff list should look like! | placeholders: %name% - name of the client',
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
                title: 'User-Line > Define what a full line in the staff list should look like! | placeholders: %name% - formatted username, %status% - formatted status phrase, %lb% - line break',
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
                title:
                    'Group-Section > Define what a group section in the staff list should look like! | placeholders: %group% - formatted group name, %users% - formatted member list, %lb% - line break',
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
                title: 'Separator > Define what the separator between each group section in the staff list should look like!',
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
                title: 'Empty-Groups > Do you want to display empty groups in the staff list? A group is considered empty if no client is assigned/stored to it?',
                type: 'select',
                options: ['Yes', 'No']
            },
            {
                name: 'emptyGroupText',
                title: 'Empty-Groups-Text > Define what the text of an empty group should look like! | placeholders: %group% - formatted group name, %lb% - line break',
                type: 'multiline',
                placeholder: '[COLOR=#aa007f][size=12][B]%name%[/B][/size]\n[/COLOR][COLOR=#c8c8c8][B]NOT ASSIGNED[/B][/COLOR]',
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
                title: 'The order in which you define the groups is important! Priority of the groups goes from top to bottom.'
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
                        title: 'Name > Define the name that should be shown for the group! If not set, it will use the default group name.',
                        indent: 2,
                        type: 'multiline',
                        placeholder: '[COLOR=#aa007f][size=12][B]ADMIN[/B][/size][/COLOR]'
                    },
                    {
                        name: 'clients',
                        title: 'Clients > Define the list of additional client IDs that should also count towards this staff group!',
                        indent: 2,
                        type: 'strings'
                    },
                    {
                        name: 'groups',
                        title: 'Groups > Define the list of additional group IDs that should also count towards this staff group!',
                        indent: 2,
                        type: 'strings'
                    }
                ]
            },
            {
                name: 'spacer3',
                title: ''
            },
            {
                name: 'header3',
                title: '->>> Dev Options <<<-'
            },
            {
                name: 'developer',
                title: "Don't change any of the following values if you have not been told to! This section is to identify problems faster and will drain performance."
            },
            {
                name: 'devEnabled',
                title: 'Do you want to enable the developer mode?',
                type: 'select',
                options: ['Yes', 'No']
            }
        ]
    },
    (_, scriptConfig) => {
        // DEPENDENCIES
        const engine = require('engine');
        const backend = require('backend');
        const event = require('event');
        const store = require('store');

        // GLOBAL VARS
        let staffClients = []; // [uid, nickname, [staff groups]]
        let groupList = []; // list of all relevant group IDs
        const uidPattern = new RegExp('^[a-zA-Z0-9+\\/]{27}=$');

        // CONFIG OPTIONS
        let config = {
            channel: scriptConfig.channel,
            clickable: scriptConfig.clickable == 0 || true,
            multiple: scriptConfig.multiple == 0 || false,
            away: scriptConfig.away == 0 || false,
            remove: scriptConfig.removeCommand == 0 || false,
            dbRemove: scriptConfig.dbRemoveCommand == 0 || false,
            template: scriptConfig.template == 0 || false,
            emptyGroup: scriptConfig.emptyGroup == 0 || false,
            staffGroups: scriptConfig.staffGroups,
            dev: scriptConfig.devEnabled == 0 || false
        };
        const away = {
            awayChannel: config.away ? scriptConfig.awayChannel == 0 || false : false,
            awayMute: config.away ? scriptConfig.awayMute === true || false : false,
            awayDeaf: config.away ? scriptConfig.awayDeaf === true || false : false,
            afkChannels: config.away ? scriptConfig.afkChannels : undefined
        };
        const remove = {
            rCommand: config.remove ? scriptConfig.command || '!remove' : undefined,
            rServer: config.remove ? scriptConfig.commandServer === true || false : undefined,
            rChannel: config.remove ? scriptConfig.commandChannel === true || false : undefined,
            rPrivate: config.remove ? scriptConfig.commandPrivate === true || false : undefined,
            rClients: config.remove ? scriptConfig.commandClients || [] : undefined,
            rGroups: config.remove ? scriptConfig.commandGroups || [] : undefined,
            rPerm: config.remove ? scriptConfig.commandNoPerm || "You don't have permission to perform this command!" : undefined,
            rArgument: config.remove ? scriptConfig.commandArgument || 'Not enough arguments! You have to add a client UID to the command! Usage: !remove <client UID>' : undefined,
            rInvalid: config.remove ? scriptConfig.commandInvalid || '"%arg%" is not a valid client UID! Make sure to send the correct one.' : undefined,
            rNotFound: config.remove ? scriptConfig.commandNotFound || 'The client (%uid%) was not found in the database! Make sure to send the correct UID.' : undefined,
            rSuccess: config.remove ? scriptConfig.commandSuccess || 'The client (%uid%) was successfully removed!' : undefined
        };
        const dbRemove = {
            dbrCommand: config.dbRemove ? scriptConfig.dbCommand || '!removedatabase' : undefined,
            dbrServer: config.dbRemove ? scriptConfig.dbCommandServer === true || false : undefined,
            dbrChannel: config.dbRemove ? scriptConfig.dbCommandChannel === true || false : undefined,
            dbrPrivate: config.dbRemove ? scriptConfig.dbCommandPrivate === true || false : undefined,
            dbrClients: config.dbRemove ? scriptConfig.dbCommandClients || [] : undefined,
            dbrGroups: config.dbRemove ? scriptConfig.dbCommandGroups || [] : undefined,
            dbrPerm: config.dbRemove ? scriptConfig.dbCommandNoPerm || "You don't have permission to perform this command!" : undefined,
            dbrEmpty: config.dbRemove ? scriptConfig.dbCommandEmpty || 'The database is already empty!' : undefined,
            dbrSuccess: config.dbRemove ? scriptConfig.dbCommandSuccess || 'The database was successfully dropped! %amount% entries have been removed.' : undefined
        };
        const template = {
            username: config.template ? scriptConfig.tUsername || '[B]%name%[/B]' : undefined,
            line: config.template ? scriptConfig.tMemberLine || '%name% [COLOR=#aaff00]>[/COLOR] %status%' : undefined,
            section: config.template ? scriptConfig.tGroupSection || '[center]%group%\n%users%____________________[/center]' : undefined,
            pOnline: (config.template ? scriptConfig.tPhraseOnline : scriptConfig.phraseOnline) || '[COLOR=#00ff00][B]ONLINE[/B][/COLOR]',
            pAway: (config.template ? scriptConfig.tPhraseAway : scriptConfig.phraseAway) || '[COLOR=#c8c8c8][B]AWAY[/B][/COLOR]',
            pOffline: (config.template ? scriptConfig.tPhraseOffline : scriptConfig.phraseOffline) || '[COLOR=#ff0000][B]OFFLINE[/B][/COLOR]',
            separator: config.template ? undefined : scriptConfig.separator || '_______________________________________'
        };
        const emptyGroup = {
            emptyText: config.emptyGroup ? scriptConfig.emptyGroupText || '[COLOR=#aa007f][size=12][B]%name%[/B][/size]\n[/COLOR][COLOR=#c8c8c8][B]NOT ASSIGNED[/B][/COLOR]' : undefined
        };

        // merge configs into one object
        config = Object.assign(config, away, remove, dbRemove, template, emptyGroup);

        // FUNCTIONS
        /**
         * Send a message to the SinusBot instance log
         * @param {String} message > the message to send
         * @returns {void} > nothing
         */
        function log(message) {
            engine.log('Staff-List > ' + message);
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
                        if (config.dev) log('waitForBackend() took ' + attempt++ + ' attempts with a timer of ' + wait + ' seconds to resolve');
                        success();
                    }
                    if (attempt >= attempts) {
                        clearInterval(timer);
                        if (config.dev) log('waitForBackend() failed at ' + attempt++ + '. attempt with a timer of ' + wait + ' seconds');
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
                if (group.clients === undefined || !group.clients.length) group.clients = [];
                if (group.groups === undefined || !group.groups.length) {
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
         * @param {String} uid > the UID of the client to store
         * @param {String} nick > the nickname of the client to store
         * @param {Array} groups > the relevant staff groups of the client to store
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
         * @param {String} uid > the UID of the client to remove
         * @returns {Boolean} > true if the client was removed, false if no entry was found
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
         * Accessing a variable is also faster than reading everything from the script storage;
         * List format: [uid, nickname, [staff groups]]
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

        /**
         * Get the relevant staff groups from a given client
         * @param {Object} client > the client object to check
         * @param {Array} staffGroups > the list of all validated staff groups from the config
         * @returns {Array} > the relevant staff groups of the given client
         */
        function getStaffGroupsFromClient(client, staffGroups) {
            let clientStaffGroups = [];
            for (let staffGroup of staffGroups) {
                if (isStaffGroupMember(client, staffGroup)) clientStaffGroups.push(staffGroup);
            }
            return clientStaffGroups;
        }

        /**
         * Check if a client is a valid member of a given staff group from the config
         * @param {Object} client > the client object to check
         * @param {Object} staffGroup > the staff group object from the config to check
         * @returns {Boolean} > true if the client is a valid member, otherwise false
         */
        function isStaffGroupMember(client, staffGroup) {
            if (staffGroup.clients.includes(client.uid())) return true;

            for (let clientGroup of client.getServerGroups()) {
                if (staffGroup.groups.includes(clientGroup.id())) return true;
            }

            return false;
        }

        /**
         * Check if a client is counted as away/afk by checking different status of them
         * @param {Object} client > the client object to check
         * @returns {Boolean} > true if the client is counted as away/afk, otherwise false
         */
        function isAway(client) {
            return client.isAway() || (config.awayMute && client.isMuted()) || (config.awayDeaf && client.isDeaf()) || (config.awayChannel && isInAfkChannel(client));
        }

        /**
         * Check if a client is in any afk channel which is given in the config
         * @param {Object} client > the client object to check
         * @returns {Boolean} > true if the client is in any afk channel, otherwise false
         */
        function isInAfkChannel(client) {
            for (let channel of client.getChannels()) {
                if (config.afkChannels.includes(channel.id())) return true;
            }

            return false;
        }

        /**
         * Format a username if the script is configured to make them clickable
         * @param {Array} staffClient > the staff client array [uid, nickname, [staff groups]]
         * @returns {String} > the formatted username
         */
        function getFormattedUsername(staffClient) {
            if (config.clickable) {
                return `[URL=client://0/${staffClient[0]}]${staffClient[1]}[/URL]`;
            } else {
                return staffClient[1];
            }
        }

        /**
         * Format a whole line that will be displayed in the list by adding all small parts together
         * @param {String} name > the formatted username
         * @param {Number} status > the online status of the client
         * @returns {String} > the formatted line
         */
        function getFormattedUserLine(name, status) {
            let formattedLine = '';
            if (config.template) {
                formattedLine = config.line.replace('%name%', config.username.replace('%name%', name)).replace('%lb%', '\n');
            } else {
                formattedLine = `${name} - %status%`;
            }

            // 0 = online, 1 = away, 2 = offline
            switch (status) {
                case 0:
                    formattedLine = formattedLine.replace('%status%', config.pOnline);
                    break;
                case 1:
                    formattedLine = formattedLine.replace('%status%', config.pAway);
                    break;
                case 2:
                    formattedLine = formattedLine.replace('%status%', config.pOffline);
                    break;
            }

            return formattedLine;
        }

        /**
         * Sort all staff clients by their online status and alphabetically
         * @returns {Array} > the list with all sorted staff clients [online, away, offline]
         */
        function getSortedStaffList() {
            let staffOnline = [];
            let staffAway = [];
            let staffOffline = [];
            staffClients.forEach(staffClient => {
                const client = backend.getClientByUID(staffClient[0]);
                if (client !== undefined) {
                    if (config.away) {
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

        /**
         * Update the channel description where the staff list should be shown in
         * @param {Array} staffGroups > the list of validated staff groups from the config
         * @param {Object} channel > the channel object to display the staff list in
         * @returns {void} > nothing
         */
        function updateDescription(staffGroups, channel) {
            const [staffOnline, staffAway, staffOffline] = getSortedStaffList();
            let description = '';
            staffGroups.forEach(staffGroup => {
                let staffClientsToList = '';
                if (config.multiple) {
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
                    if (!config.emptyGroup) return;
                    description += config.emptyText.replace('%group%', staffGroup.name).replace('%lb%', '\n');
                } else {
                    if (config.template) {
                        description += config.section
                            .replace('%group%', staffGroup.name)
                            .replace('%users%', staffClientsToList.substring(0, staffClientsToList.length - 1))
                            .replace('%lb%', '\n');
                    } else {
                        description += `${staffGroup.name}\n${staffClientsToList}${config.separator}\n`;
                    }
                }
            });

            // set new description to channel
            channel.setDescription(description);
        }

        // LOADING EVENT
        event.on('load', () => {
            // dev mode config dumb
            if (config.dev) console.log(Object.entries(config));

            // error prevention that needs script deactivation
            if (config.channel === undefined) {
                log('There was no channel selected to display the staff list! Deactivating script...');
                return;
            } else if (!config.staffGroups || !config.staffGroups.length) {
                log('There are no staff groups configured to be displayed in the staff list! Deactivating script...');
                return;
            } else {
                // error prevention that needs feature deactivation
                if (config.away && config.awayChannel && !config.afkChannels) {
                    log('There were no afk channels set up although the afk channel option is enabled! Deactivating the feature...');
                    config.awayChannel = false;
                }
                if (config.remove && !config.rClients.length && !config.rGroups.length) {
                    log("There are no clients whitelisted for the remove command although it's enabled! Deactivating feature...");
                    config.remove = false;
                } else if (config.remove && !config.rServer && !config.rChannel && !config.rPrivate) {
                    log('There is no text channel selected for the bot to listen to the remove command! Deactivating feature...');
                    config.remove = false;
                }
                if (config.dbRemove && !config.dbrClients.length && !config.dbrGroups.length) {
                    log("There are no clients whitelisted for the database remove command although it's enabled! Deactivating feature...");
                    config.dbRemove = false;
                } else if (config.dbRemove && !config.dbrServer && !config.dbrChannel && !config.dbrPrivate) {
                    log('There is no text channel selected for the bot to listen to the database remove command! Deactivating feature...');
                    config.dbRemove = false;
                }

                // start the script
                waitForBackend(10, 3)
                    .then(() => {
                        log('The script has loaded successfully!');
                        main();
                    })
                    .catch(() => {
                        log(
                            'The bot was not able to connect to the backend in time! To use this script, the bot needs to be connected to your TeamSpeak server. Make sure it can connect. Deactivating script...'
                        );
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
                if (clientStaffGroups.length) {
                    storeClient(client.uid(), client.nick(), clientStaffGroups);
                } else {
                    removeClient(client.uid());
                }
            });

            // update the description for all currently known staff clients
            updateDescription(staffGroups, channel);

            /**
             * MOVE EVENT
             * fired when a client switches channels or joins/leaves the server
             * check all necessary information here such as if the client is relevant
             * for the staff list and update the list accordingly
             */
            event.on('clientMove', event => {
                const client = event.client;
                if (client.isSelf()) return;
                const fromChannel = event.fromChannel;
                const toChannel = event.toChannel;
                const uid = client.uid();
                const nick = client.nick();
                const groups = getStaffGroupsFromClient(client, staffGroups);

                // check if it's a relevant client
                if (groups.length) {
                    // update list on server join/leave
                    if (fromChannel === undefined || toChannel === undefined) {
                        // make sure client is stored
                        storeClient(uid, nick, groups);
                        updateDescription(staffGroups, channel);
                    }

                    // update list on afk channel join/leave if the feature is enabled
                    if (
                        config.away &&
                        config.awayChannel &&
                        ((fromChannel !== undefined && config.afkChannels.includes(fromChannel.id())) || (toChannel !== undefined && config.afkChannels.includes(toChannel.id())))
                    ) {
                        updateDescription(staffGroups, channel);
                    }
                } else {
                    // if the client is not relevant but still has a database entry, drop them
                    if (removeClient(uid)) {
                        updateDescription(staffGroups, channel);
                    }
                }
            });

            /**
             * AFK EVENT
             * fired when a client sets themself to away in TeamSpeak
             * if the away status is activated, this will update the list
             */
            event.on('clientAway', client => {
                if (!config.away) return;
                if (client.isSelf()) return;
                if (getStaffGroupsFromClient(client, staffGroups).length) updateDescription(staffGroups, channel);
            });

            /**
             * UN-AFK EVENT
             * fired when a client sets themself to be back in TeamSpeak
             * if the away status is activated, this will update the list
             */
            event.on('clientBack', client => {
                if (!config.away) return;
                if (client.isSelf()) return;
                if (getStaffGroupsFromClient(client, staffGroups).length) updateDescription(staffGroups, channel);
            });

            /**
             * MUTE EVENT
             * fired when a client mutes their microphone in TeamSpeak
             * this does not include a disabled microphone
             * if the away status is activated, this will update the list
             */
            event.on('clientMute', client => {
                if (!config.away) return;
                if (!config.awayMute) return;
                if (client.isSelf()) return;
                if (getStaffGroupsFromClient(client, staffGroups).length) updateDescription(staffGroups, channel);
            });

            /**
             * UN-MUTE EVENT
             * fired when a client unmutes their microphone in TeamSpeak
             * if the away status is activated, this will update the list
             */
            event.on('clientUnmute', client => {
                if (!config.away) return;
                if (!config.awayMute) return;
                if (client.isSelf()) return;
                if (getStaffGroupsFromClient(client, staffGroups).length) updateDescription(staffGroups, channel);
            });

            /**
             * DEAF EVENT
             * fired when a client sets themself to deaf in TeamSpeak
             * this does not include a disabled speakers
             * if the away status is activated, this will update the list
             */
            event.on('clientDeaf', client => {
                if (!config.away) return;
                if (!config.awayDeaf) return;
                if (client.isSelf()) return;
                if (getStaffGroupsFromClient(client, staffGroups).length) updateDescription(staffGroups, channel);
            });

            /**
             * UN-DEAF EVENT
             * fired when a client sets themself to undeaf in TeamSpeak
             * if the away status is activated, this will update the list
             */
            event.on('clientUndeaf', client => {
                if (!config.away) return;
                if (!config.awayDeaf) return;
                if (client.isSelf()) return;
                if (getStaffGroupsFromClient(client, staffGroups).length) updateDescription(staffGroups, channel);
            });

            /**
             * GROUP-ADDED EVENT
             * fired when a client is added to a servergroup in TeamSpeak
             * this won't fire if the client is not visible for the bot
             * check if the group is relevant, update the client entry in the database and update the list
             */
            event.on('serverGroupAdded', event => {
                const client = event.client;
                if (client.isSelf()) return;
                if (groupList.includes(event.serverGroup.id())) {
                    storeClient(client.uid(), client.nick(), getStaffGroupsFromClient(client, staffGroups));
                    updateDescription(staffGroups, channel);
                }
            });

            /**
             * GROUP-REMOVED EVENT
             * fired when a client is removed from a servergroup in TeamSpeak
             * this won't fire if the client is not visible for the bot
             * check if the group is relevant, update the client entry in the database and update the list
             */
            event.on('serverGroupRemoved', event => {
                const client = event.client;
                if (client.isSelf()) return;
                if (groupList.includes(event.serverGroup.id())) {
                    const groups = getStaffGroupsFromClient(client, staffGroups);

                    if (groups.length) {
                        storeClient(client.uid(), client.nick(), groups);
                    } else {
                        removeClient(client.uid());
                    }
                    updateDescription(staffGroups, channel);
                }
            });

            /**
             * CHAT EVENT
             * fired when a client sends a visible message to the bot
             * mode: 1 - private, 2 - channel, 3 - server
             * check for command input
             */
            event.on('chat', event => {
                const client = event.client;
                if (client.isSelf()) return;
                const message = event.text;

                // database drop/remove command
                if (config.dbRemove && message.substring(0, config.dbrCommand.length) === config.dbrCommand) {
                    // check command permission
                    let permission = false;
                    if (config.dbrClients.length && config.dbrClients.includes(client.uid())) permission = true;
                    if (!permission && config.dbrGroups.length) {
                        for (let group of client.getServerGroups()) {
                            if (config.dbrGroups.includes(group.id())) {
                                permission = true;
                                break;
                            }
                        }
                    }
                    if (!permission) {
                        // tell invoker that they have no permission
                        client.chat(config.dbrPerm);
                        return;
                    }

                    // check chat channel
                    switch (event.mode) {
                        case 1:
                            // private chat
                            if (!config.dbrPrivate) return;
                            break;
                        case 2:
                            // channel chat
                            if (!config.dbrChannel) return;
                            break;
                        case 3:
                            // server chat
                            if (!config.dbrServer) return;
                            break;
                    }

                    // perform the actual command, count deletions to give feedback
                    let deleted = 0;
                    store.getKeys().forEach(key => {
                        store.unset(key);
                        deleted++;
                    });
                    updateStaffClients();
                    updateDescription(staffGroups, channel);
                    if (!deleted) {
                        // tell invoker that database is already empty
                        client.chat(config.dbrEmpty);
                    } else {
                        // tell invoker that database drop was successful and report amount of removed entries
                        client.chat(config.dbrSuccess.replace('%amount%', deleted));
                    }
                } else if (config.remove && message.substring(0, config.rCommand.length) === config.rCommand) {
                    // client remove command
                    // check command permission
                    let permission = false;
                    if (config.rClients.length && config.rClients.includes(client.uid())) permission = true;
                    if (!permission && config.rGroups.length) {
                        for (let group of client.getServerGroups()) {
                            if (config.rGroups.includes(group.id())) {
                                permission = true;
                                break;
                            }
                        }
                    }
                    if (!permission) {
                        // tell invoker that they have no permission
                        client.chat(config.rPerm);
                        return;
                    }

                    // check chat channel
                    switch (event.mode) {
                        case 1:
                            // private chat
                            if (!config.rPrivate) return;
                            break;
                        case 2:
                            // channel chat
                            if (!config.rChannel) return;
                            break;
                        case 3:
                            // server chat
                            if (!config.rServer) return;
                            break;
                    }

                    // perform the actual command
                    const uid = message.substring(config.rCommand.length, message.length).trim();
                    if (!uid) {
                        // tell invoker that a uid has to be provided as argument
                        client.chat(config.rArgument);
                        return;
                    }
                    if (!uid.match(uidPattern)) {
                        // tell invoker that provided argument is not a valid uid
                        client.chat(config.rInvalid.replace('%arg%', uid));
                        return;
                    }
                    if (removeClient(uid)) {
                        // tell invoker that client was successfully removed
                        client.chat(config.rSuccess.replace('%uid%', uid));
                        updateDescription(staffGroups, channel);
                    } else {
                        // tell invoker that provided entry was not found
                        client.chat(config.rNotFound.replace('%uid%', uid));
                    }
                }
            });
        }
    }
);
