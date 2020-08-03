# **Configuration Guide**

> This guide will give you a detailed information how to configure the script to your needs.

---

<br>

<!-- Table of Contents -->
<details>
    <summary>
        <strong>Table of Contents (click to expand)</strong>
    </summary>

- [**Configuration Guide**](#configuration-guide)
  - [**How does the script operate?**](#how-does-the-script-operate)
  - [**General Options**](#general-options)
  - [**Text & Format Options**](#text--format-options)
  - [**Group Options**](#group-options)
</details>


## **How does the script operate?**
A good start to configure a script is to understand its functionality. Here are a few small points which are important if you want to set everything up correctly.

1. The script checks all clients it has to list and their online status right when the script starts to build an initial list that is displayed in the selected channel. After that, different events trigger a new check. To mention some events: a client joins/leaves, a client switches rooms, a client sets themself to mute/deaf/away, etc [...]
2. Since there is no way of retrieving usernames from offline clients, the script stores each relevant client in a storage so their name and information is also available if the client is not online. This means that a client you want to list has to be online at least once while the bot is running with the script while the client has a relevant staff group.
3. Groups that are set up but don't have any clients stored by the script are considered empty. There is a config option to display those with a custom text. Otherwise they will be skipped and not be displayed in the channel.
4. Clients that are listed within a staff group are sorted by their status (online, away, offline) and alphabetically.
5. The script detects a lot of misconfiguration and provides standard values. Just make sure to fill out each field marked with (*). If there is a severe error that affects the script's functionality, it will be written in the log and the script won't be executed.
6. Last but most important thing: the staff groups you define in the configuration are prioritized from top to bottom. There is a config option to choose if a client should be displayed in the staff group with the highest priority only or in all of the relevant groups.


## **General Options**
The first section is all about the general options. You configure every basic aspect of the script here.

Please click the option you want to configure to get more information.

<details>
    <summary>
        Display-Channel
    </summary>

*Details*:
- required option | default value: `none`
- enter the channel ID
- you can also select the channel from a dropdown menu if the bot is connected to the TeamSpeak server

*Info*:
- defines the channel in the TeamSpeak where the list should be displayed in
- it will use the channel description for it
- all other parameters of the channel such as the name, the codec and others are untouched
</details>
<details>
    <summary>
        Clickable-Names
    </summary>

*Details*:
- optional option | default value: `Yes`
- select `Yes` or `No`

*Info*:
- defines if usernames in the list should be formatted as hyperlinks
- hyperlink usernames can be used to edit groups, send messages and other actions right from the list
- uses the same menu as when you rightclick a client in TeamSpeak by yourself
- if you choose no, it will just use plain text
</details>
<details>
    <summary>
        Show-Multiple-Groups
    </summary>

*Details*:
- optional option | default value: `No`
- select `Yes` or `No`

*Info*:
- defines if clients with multiple relevant staff groups should be displayed in all of them
- if you choose no, the client will only be shown in the group with the highest priority from the config (the one that comes first)
</details>
<details>
    <summary>
        Away-Status
    </summary>

*Details*:
- optional option | default value: `No`
- select `Yes` or `No`

*Info*:
- defines if the script should check for the away status of clients to display it instead of online or offline
- you can configure what counts as *away* later and also format how it looks like

*Advanced Options*:
- the following options are only shown if you selected `Yes` for the *Away-Status*

    <details>
        <summary>
            Away-Channels
        </summary>

    *Details*:
    - optional option | default value: `No`
    - select `Yes` or `No`

    *Info*:
    - defines whether a client is set to *away* if they enter any afk channel

    *Advanced Options*:
    - the following option is only shown if you selected `Yes` for *Away-Channels*

        <details>
            <summary>
                AFK-Channels
            </summary>

        *Details*:
        - required option | default value: `none`
        - enter the channel IDs

        *Info*:
        - defines the afk channels on the TeamSpeak where clients that are *away* usually go
        - if a client joins one of the channels, they will be set to *away* in the list
        </details>
    </details>
    <details>
        <summary>
            Away-Mute
        </summary>

    *Details*:
    - optional option | default value: `unchecked`
    - check/uncheck the box

    *Info*:
    - defines if a muted client is counted as *away*
    - deactivated microphone does not count towards this
    </details>
    <details>
        <summary>
            Away-Deaf
        </summary>

    *Details*:
    - optional option | default value: `unchecked`
    - check/uncheck the box

    *Info*:
    - defines if a client that set themself to deaf is counted as *away*
    - deactivated speakers do not count towards this
    </details>
</details>
<details>
    <summary>
        Remove-Command
    </summary>

*Details*:
- optional option | default value: `No`
- select `Yes` or `No`

*Info*:
- defines if there should be a command to manually remove a client from the staff list & script database
- this can be used to manually remove a client from the database if you removed a group while they were offline for example

*Advanced Options*:
- the following options are only shown if you selected `Yes` for the *Remove-Command*

    <details>
        <summary>
            Command
        </summary>

    *Details*:
    - optional option | default value: `!remove`
    - enter the command text
    - it's case sensitive

    *Info*:
    - defines the phrase that should be the remove command
    </details>
    <details>
        <summary>
            Server
        </summary>

    *Details*:
    - optional option | default value: `unchecked`
    - check/uncheck the box

    *Info*:
    - defines if the bot should listen to the command when it's sent in the server chat
    </details>
    <details>
        <summary>
            Channel
        </summary>

    *Details*:
    - optional option | default value: `unchecked`
    - check/uncheck the box

    *Info*:
    - defines if the bot should listen to the command when it's sent in the channel chat
    </details>
    <details>
        <summary>
            Private
        </summary>

    *Details*:
    - optional option | default value: `unchecked`
    - check/uncheck the box

    *Info*:
    - defines if the bot should listen to the command when it's sent in the private chat
    </details>
    <details>
        <summary>
            Clients
        </summary>

    *Details*:
    - semi-required option | default value: `none`
    - enter the client UIDs

    *Info*:
    - defines if a client has the permission to use the remove command
    - at least one client must be defined if no group is whitelisted for the command
    - if no clients or groups are whitelisted, the feature will be disabled automatically
    </details>
    <details>
        <summary>
            Groups
        </summary>

    *Details*:
    - semi-required option | default value: `none`
    - enter the group IDs

    *Info*:
    - defines if a group has the permission to use the remove command
    - at least one group must be defined if no client is whitelisted for the command
    - if no clients or groups are whitelisted, the feature will be disabled automatically
    </details>
</details>


## **Text & Format Options**
The next section is all about how the staff list looks and what should be written into it.

Please click the option you want to configure to get more information.

<details>
    <summary>
        Custom-Template
    </summary>

*Details*:
- optional option | default value: `No`
- select `Yes` or `No`

*Info*:
- this is an advanced option and will change a lot in the script so read carefully
- defines if the script should use a custom template from the config to display the staff list
- if you use the custom template, you can configure every formatting aspect of the staff list yourself
- if you don't use the custom template, the list will be formatted in the default way
  - you can still customize the list a bit
  - specific strings such as the online, away and offline phrases are still editable

*Preview*:
- these two preview images show how the staff list *could* look like, with and without the custom template
- as you can see, the custom template offers editing nearly every aspect of the list
    <details>
        <summary>
            with custom template
        </summary>

    ![preview-customTemplate](images/preview_customTemplate.png)
    </details>
    <details>
        <summary>
            without custom template
        </summary>

    ![preview-givenTemplate](images/preview_givenTemplate.png)
    </details>
</details>

Next up, you should open the section depending on the option you chose for the template as you will have different options for each template setting.

All texts you can edit support BB code formatting, that's the same formatting style TeamSpeak uses. There is also an editor for it built into TeamSpeak if you edit a channel description and click on the pop-out editor.
<details>
    <summary>
        where do I find the BB code editor
    </summary>

![help-bbCodeEditor](images/help_bbCodeEditor.png)
</details>

<br>

<details>
    <summary>
        Custom-Template - Yes
    </summary>

- the following options are only shown if you selected `Yes` for the *Custom-Template*
    <details>
        <summary>
            Username
        </summary>

    *Details*:
    - optional option | default value: `[B]%name%[/B]`
    - enter the username format text
    - available placeholders:
      - %name% - the name of the client

    *Info*:
    - defines the format of a username and how it's shown in the staff list
    - this is only a part of the whole line
    - if you want to edit the whole line, you have to configure the *User-Line* option
    - keep in mind that not all BB code formatting works if the usernames are clickable hyperlinks
    </details>
    <details>
        <summary>
            Online-Phrase
        </summary>

    *Details*:
    - optional option | default value: `[COLOR=#00ff00][B]ONLINE[/B][/COLOR]`
    - enter the online status format text

    *Info*:
    - defines the format of the status phrase if the client is online
    - this is only a part of the whole line
    - if you want to edit the whole line, you have to configure the *User-Line* option
    </details>
    <details>
        <summary>
            Away-Phrase
        </summary>

    *Details*:
    - optional option | default value: `[COLOR=#c8c8c8][B]AWAY[/B][/COLOR]`
    - enter the away/afk status format text
    - this option is only shown if you selected `Yes` for the *Away-Status*

    *Info*:
    - defines the format of the status phrase if the client is away/afk
    - this is only a part of the whole line
    - if you want to edit the whole line, you have to configure the *User-Line* option
    </details>
    <details>
        <summary>
            Offline-Phrase
        </summary>

    *Details*:
    - optional option | default value: `[COLOR=#ff0000][B]OFFLINE[/B][/COLOR]`
    - enter the offline status format text

    *Info*:
    - defines the format of the status phrase if the client is offline
    - this is only a part of the whole line
    - if you want to edit the whole line, you have to configure the *User-Line* option
    </details>
    <details>
        <summary>
            User-Line
        </summary>

    *Details*:
    - optional option | default value: `%name% [COLOR=#aaff00][B]>[/B][/COLOR] %status%`
    - enter the user line format text
    - available placeholders:
      - %name% - the formatted username from the option *Username*
      - %status% - the formatted online status from the options *Phrase-Online*, *Phrase-Away* & *Phrase-Offline*
      - %lb% - a linebreak, same like pressing the *Enter-key* in a text file

    *Info*:
    - defines the format of a user line and how it's shown in the staff list
    - this uses the earlier defined phrases as placeholders so it doesn't matter if you formatted them earlier or here but it is recommended to only format once to avoid interference
    - this option can be used to align the line or for other options that are then applied to the whole line
    - keep in mind that there is always a line break at each end of the lines by default so the next client in the next line
    </details>
    <details>
        <summary>
            Group-Section
        </summary>

    *Details*:
    - optional option | default value: `[center]%group%%lb%%users%____________________[/center]`
    - enter the group section format text
    - available placeholders:
      - %group% - the formatted group name, you can set this in the staff groups later
      - %users% - the formatted user lines from the option *User-Line*
      - %lb% - a linebreak, same like pressing the *Enter-key* in a text file

    *Info*:
    - defines the format of a whole group and how it's shown in the staff list
    - this uses the earlier defined phrases as placeholders so it doesn't matter if you formatted them earlier or here but it is recommended to only format once to avoid interference
    - this option can be used to align the whole group section or for other options that are then applied to the whole group
    - you can also globally format the group name here, specific formats for each group name can be done later in the staff groups settings
    </details>
</details>
<details>
    <summary>
        Custom-Template - No
    </summary>

- the following options are only shown if you selected `No` for the *Custom-Template*
    <details>
        <summary>
            Separator
        </summary>

    *Details*:
    - optional option | default value: `_______________________________________`
    - enter the separator format text

    *Info*:
    - defines the format of a separator and how it's shown in the staff list
    - this is attached after each group section so they are separated in the list
    </details>
    <details>
        <summary>
            Online-Phrase
        </summary>

    *Details*:
    - optional option | default value: `[COLOR=#00ff00][B]ONLINE[/B][/COLOR]`
    - enter the online status format text

    *Info*:
    - defines the format of the status phrase if the client is online
    - this is attached after the username and a dash to separate the name from the status
    </details>
    <details>
        <summary>
            Away-Phrase
        </summary>

    *Details*:
    - optional option | default value: `[COLOR=#c8c8c8][B]AWAY[/B][/COLOR]`
    - enter the away/afk status format text
    - this option is only shown if you selected `Yes` for the *Away-Status*

    *Info*:
    - defines the format of the status phrase if the client is away/afk
    - this is attached after the username and a dash to separate the name from the status
    </details>
    <details>
        <summary>
            Offline-Phrase
        </summary>

    *Details*:
    - optional option | default value: `[COLOR=#ff0000][B]OFFLINE[/B][/COLOR]`
    - enter the offline status format text

    *Info*:
    - defines the format of the status phrase if the client is offline
    - this is attached after the username and a dash to separate the name from the status
    </details>
</details>

There is one last option for *Text & Format* that is not related to the template option.

<details>
    <summary>
        Empty-Groups
    </summary>

*Details*:
- optional option | default value: `No`
- select `Yes` or `No`

*Info*:
- defines whether an empty group is still shown in the list
- a group is considered empty if no client is assigned or stored to it

*Advanced Options*:
- the following option is only shown if you selected `Yes` for the *Empty-Groups*

    <details>
        <summary>
            Empty-Groups-Text
        </summary>

    *Details*:
    - optional option | default value: `[COLOR=#c8c8c8][B]NOT ASSIGNED[/B][/COLOR]`
    - enter the text that should be displayed if the group is considered empty

    *Info*:
    - this is written below the name of the group
    </details>
</details>


## **Group Options**
The last section is all about the staff groups. You can set individual settings for each group here. These are the groups that are displayed in the staff list.

Please click the option you want to configure to get more information.

<details>
    <summary>
        ID
    </summary>

*Details*:
- required option | default value: `none`
- enter the group ID

*Info*:
- if you don't enter an ID of a group or the ID does not refer to a valid group, the corresponding staff group will be skipped and not be listed
</details>
<details>
    <summary>
        Name
    </summary>

*Details*:
- optional option | default value: name of the group
- enter the name

*Info*:
- if you leave this field empty, the script will use the normal name of the group
- this can be used to format the name for each group individually for example making it more colorful or giving it a different name in the list than it actually has on the TeamSpeak
</details>
<details>
    <summary>
        Clients
    </summary>

*Details*:
- optional option | default value: `none`
- enter the client UIDs

*Info*:
- this list does not need the UIDs of clients that are already members of the main group
- this can be used if you want to list clients in the same section although they don't have the main group
</details>
<details>
    <summary>
        Groups
    </summary>

*Details*:
- optional option | default value: `none`
- enter the group IDs

*Info*:
- this list does not need the ID of the main group
- this can be used if you want to list groups in the same section although they don't have the main group
</details>

---

**You are done with the configuration now!**
