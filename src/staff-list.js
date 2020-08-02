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
                    "The script stores usernames from people that should of the staff groups. Each user you want to list has to join the server at least once while the script is running. If the script doesn't have any stored users for a specific group yet, it will not be displayed."
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
                name: 'duplicates',
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
                title: 'Away-Channel > Do you want to set someone away/afk if they join any afk channel?',
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
                name: 'awayDeaf',
                title: 'Away-Deaf > Do you want to count deaf clients as away/afk?',
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
                name: 'removeCommand',
                title:
                    'Remove-Command > Do you want a command to remove users manually from the staff list? This can be helpful if they were offline when you removed them from a group or for similar situations.',
                type: 'select',
                options: ['Yes', 'No']
            },
            {
                name: 'command',
                title: 'Command > Define the command you want to use to delete a user manually!',
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
                title: 'Username > Define what the name of a user in the list should look like! | placeholders: %name% - name of the user',
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
                title: 'Online-Phrase > Define what the phrase if a user is online should look like!',
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
                title: 'Away-Phrase > Define what the phrase if a user is away/afk should look like!',
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
                title: 'Offline-Phrase > Define what the phrase if a user is offline should look like!',
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
                title: 'Online-Phrase > Define what the phrase if a user is online should look like!',
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
                title: 'Away-Phrase > Define what the phrase if a user is away/afk should look like!',
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
                title: 'Offline-Phrase > Define what the phrase if a user is offline should look like!',
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
                    'The order in which you define the groups is important! Priority of the groups goes from top to bottom. If a user has two groups, they will be displayed in the group which comes first in the config.'
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
        const prefix = 'Staff-List';
        let staffList = [];
        let groupList = [];

        // CONFIG OPTIONS
        const template = varDef(config.template, 1) == 0;
        const clickable = varDef(config.clickable, 0) == 0;
        const duplicates = varDef(config.duplicates, 1) == 0;
        const away = varDef(config.away, 1) == 0;
        let awayChannel, awayMute, awayDeaf;
        if (away) {
            awayChannel = varDef(config.awayChannel, 1) == 0;
            awayMute = varDef(config.awayMute, 1) == 0;
            awayDeaf = varDef(config.awayDeaf, 1) == 0;
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

        // FUNCTIONS
        function log(message) {
            engine.log(prefix + ' > ' + message);
        }

        function varDef(v, defVal) {
            if (v === undefined || v === null || v === '') {
                return defVal;
            } else {
                return v;
            }
        }

        function waitForBackend() {
            return new Promise(done => {
                const timer = setInterval(() => {
                    if (backend.isConnected()) {
                        clearInterval(timer);
                        done();
                    }
                }, 1000);
            });
        }

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

        function validateDatabase() {
            store.getKeys().forEach(key => {
                // delete entries from database which do not contain group objects
                if (Array.isArray(store.get(key)[1])) {
                    if (store.get(key)[1].some(clientGroup => typeof clientGroup !== 'object')) removeUser(key);
                } else {
                    if (typeof store.get(key)[1] !== 'object') removeUser(key);
                }
                // remove all users from database who do not have a required group
                if (store.get(key)[1].some(clientGroup => !groupList.includes(clientGroup.id))) removeUser(key);
            });
        }

        function storeUser(uid, nick, groups) {
            if (!store.getKeys().includes(uid)) {
                store.set(uid, [nick, groups]);
            } else if (store.get(uid)[0] !== nick) {
                store.unset(uid);
                store.set(uid, [nick, groups]);
            } else if (store.get(uid)[1] !== groups) {
                store.unset(uid);
                store.set(uid, [nick, groups]);
            }
            updateStaffList();
        }

        function removeUser(uid) {
            if (store.getKeys().includes(uid)) {
                store.unset(uid);
                updateStaffList();
                return true;
            } else {
                return false;
            }
        }

        function updateStaffList() {
            let list = [];
            const keys = store.getKeys();
            keys.forEach(key => {
                list.push([key, store.get(key)[0], store.get(key)[1]]);
            });

            staffList = list;
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

        function getFormattedUsername(staffUser) {
            if (clickable) {
                return `[URL=client://0/${staffUser[0]}]${staffUser[1]}[/URL]`;
            } else {
                return staffUser[1];
            }
        }

        function getFormattedUserLine(name, status) {
            // 0 = online, 1 = away, 2 = offline
            let formattedName = '';
            if (template) {
                formattedName = userLine.replace('%name%', username.replace('%name%', name)).replace('%lb%', '\n');
            } else {
                formattedName = `${name} - %status%`;
            }

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
            staffList.forEach(staffUser => {
                const client = backend.getClientByUID(staffUser[0]);
                if (client !== undefined) {
                    if (away) {
                        if (isAway(client)) {
                            staffAway.push(staffUser);
                        } else {
                            staffOnline.push(staffUser);
                        }
                    } else {
                        staffOnline.push(staffUser);
                    }
                } else {
                    staffOffline.push(staffUser);
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
                let staffUsersToList = '';
                if (duplicates) {
                    staffOnline.forEach(staffUser => {
                        if (staffUser[2].some(group => group.id === staffGroup.id)) {
                            const staffUserFormatted = getFormattedUsername(staffUser);
                            const staffUserToList = getFormattedUserLine(staffUserFormatted, 0);
                            staffUsersToList += `${staffUserToList}\n`;
                        }
                    });
                    staffAway.forEach(staffUser => {
                        if (staffUser[2].some(group => group.id === staffGroup.id)) {
                            const staffUserFormatted = getFormattedUsername(staffUser);
                            const staffUserToList = getFormattedUserLine(staffUserFormatted, 1);
                            staffUsersToList += `${staffUserToList}\n`;
                        }
                    });
                    staffOffline.forEach(staffUser => {
                        if (staffUser[2].some(group => group.id === staffGroup.id)) {
                            const staffUserFormatted = getFormattedUsername(staffUser);
                            const staffUserToList = getFormattedUserLine(staffUserFormatted, 2);
                            staffUsersToList += `${staffUserToList}\n`;
                        }
                    });
                } else {
                    staffOnline.forEach(staffUser => {
                        if (staffGroup.id === staffUser[2][0].id) {
                            const staffUserFormatted = getFormattedUsername(staffUser);
                            const staffUserToList = getFormattedUserLine(staffUserFormatted, 0);
                            staffUsersToList += `${staffUserToList}\n`;
                        }
                    });
                    staffAway.forEach(staffUser => {
                        if (staffGroup.id === staffUser[2][0].id) {
                            const staffUserFormatted = getFormattedUsername(staffUser);
                            const staffUserToList = getFormattedUserLine(staffUserFormatted, 1);
                            staffUsersToList += `${staffUserToList}\n`;
                        }
                    });
                    staffOffline.forEach(staffUser => {
                        if (staffGroup.id === staffUser[2][0].id) {
                            const staffUserFormatted = getFormattedUsername(staffUser);
                            const staffUserToList = getFormattedUserLine(staffUserFormatted, 2);
                            staffUsersToList += `${staffUserToList}\n`;
                        }
                    });
                }

                if (staffUsersToList !== '') {
                    if (template) {
                        description += groupSection
                            .replace('%group%', staffGroup.name)
                            .replace('%users%', staffUsersToList.substring(0, staffUsersToList.length - 1))
                            .replace('%lb%', '\n');
                    } else {
                        description += `${staffGroup.name}\n${staffUsersToList}${separator}\n`;
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
                log("There are no users whitelisted for the remove command although it's enabled! Deactivating script...");
                return;
            } else if (removeCommand && !commandServer && !commandChannel && !commandPrivate) {
                log('There is no text channel selected for the bot to listen to commands! Deactivating script...');
                return;
            } else {
                log('The script has loaded successfully!');

                // start the script
                waitForBackend().then(() => {
                    main();
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

            // store all online listed staff users
            backend.getClients().forEach(client => {
                const clientStaffGroups = getStaffGroupsFromClient(client, staffGroups);
                if (clientStaffGroups !== null) {
                    storeUser(client.uid(), client.nick(), clientStaffGroups);
                } else {
                    removeUser(client.uid());
                }
            });

            // update the cached member list
            updateStaffList();

            // update the description for all currently known staff users
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

                // make sure it's a user that has to be listed
                if (groups !== null) {
                    // on connect or disconnect
                    if (fromChannel === undefined || toChannel === undefined) {
                        // make sure user is stored
                        storeUser(uid, nick, groups);

                        // update the description
                        updateDescription(staffGroups, channel);
                    }

                    // on afk channel join or leave
                    if (awayChannel && ((fromChannel !== undefined && config.afkChannels.includes(fromChannel.id())) || (toChannel !== undefined && config.afkChannels.includes(toChannel.id())))) {
                        updateDescription(staffGroups, channel);
                    }
                } else {
                    // if user has no list group but is in the database, delete them
                    removeUser(uid);
                    updateDescription(staffGroups, channel);
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
                    storeUser(client.uid(), client.nick(), getStaffGroupsFromClient(client, staffGroups));
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
                        removeUser(client.uid());
                    } else {
                        storeUser(client.uid(), client.nick(), groups);
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
                if (removeUser(uid)) {
                    client.chat('The user was successfully removed!');
                    updateDescription(staffGroups, channel);
                } else {
                    client.chat('The user was not found in the database! Make sure to send the correct UID.');
                }
            });
        }
    }
);
