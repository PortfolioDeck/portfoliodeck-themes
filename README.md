## How to run

Open `index.html` in a browser.

## Adding a theme

Create a new topic branch, i.e. “kitteh-theme”

Add a folder in `themes` with your theme name. The folder needs the following files:

* collection.liquid
* index.liquid
* item.liquid
* layout.liquid
* page.liquid
* set.liquid
* theme.yml (settings for theme)

Add a folder to your themes folder called `assets`, this is where you put static files like CSS and Javascript.

Add your theme to list of themes i `themes.js` to make it display in the theme menu.

### theme.yml

The file `theme.yml` is used to specify settings for a theme. Name is required.

Example theme.yml:

	name: "My theme"
	description: "This is a super awesome theme"
	hidden: true # the theme will not be listed in the app
	default: true # theme is default for new accounts, only one theme in the main repo can have this
	

## Syncing themes with application

This requires that you have access to the main PortfolioDeck app repository.

In main project repo run

	$ cd Projects/PortfolioDeck
	$ rake themes:sync