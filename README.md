## PortfolioDeck Themes

These are the themes that are available in the Portfoliodeck web app. 
Check it out if you haven't: http://portfoliodeck.com.

## Themulator

Themulator is a javascript engine that can run 
PortfolioDeck themes locally on a web server. You will see the themes as they would look 
on PortfolioDeck. We call it Themulator &ndash; and it's included in this repository.


### Running Themulator

Just open `/index.html` in a browser. You *MUST* run the Themulator from a web server (for browser security reasons). 
You may use the built in Apache server in OS X for example.


## Adding a theme

Create a new topic branch, i.e. “kitteh-theme” and add a folder in `themes` with your theme name. 
The folder needs the following files:

* collection.liquid
* index.liquid
* item.liquid
* layout.liquid
* page.liquid
* set.liquid
* theme.yml (settings for theme)

Add a folder to your themes folder called `assets`, this is where you put static files like CSS and Javascript. 
You may also put a screenshot.jpg in assets to be used as an illustration of your theme.

Add your theme to list of themes i `/themes.js` to make it display in the theme menu.


### theme.yml

The file `theme.yml` is used to specify settings for a theme. The `name` field is required. Example theme.yml:

	name: "My theme"
	description: "This is a super awesome theme"
	hidden: true # the theme will not be listed in the app
	default: true # theme is default for new accounts, only one theme in the main repo can have this
	

## Writing themes

It's easy. Just check out http://portfoliodeck.com/docs/themes.html


## Syncing themes with application

This requires that you have access to the main PortfolioDeck app repository.

In main project repo run

	$ cd Projects/PortfolioDeck
	$ rake themes:sync