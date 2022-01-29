# Symfony 5 + Twig Project Template

[[Storybook]](https://__LINK_HERE__/storybook/index.html) | [[Alpha page]](http://__LINK_HERE__.alpha.vucx.de)

This project template contains:

* Symfony setup
    * Annotation routes
    * Developer tools (debug, make, ...)
* Webpack setup
    * SCSS
    * ESNext with Babel
* Templating setup
    * PHP Twig templates
    * aBEM component structure
    * Storybook with Twig.js rendered templates

## Install

```shell
git clone git@git.vucx.de:vucx/symfony-5-webpack-template.git
cd symfony-5-webpack-template

composer install
yarn install
```

Then rename the project, change the git origin, ...

## Development

We have set up a few scripts and settings to ease the time-to-development

### Services

Conveniently start all services by using the IntelliJ runConfigurations stored in this project.

This will start the following services:

```shell
yarn dev-server
yarn storybook
symfony serve
```

### Components

You can create a new component directory using the clone script:

```shell
bin/clone AComponentName
```

This will copy the component template and rename all relevant tokens.

If your component does not use any JavaScript, make sure to remove the boilerplate code (the entire class and its import
and usage in the `*.stories.js` file).

## Building

Regular dev/prod builds:

```shell
yarn dev
yarn build
```

Bundle analyser:

```shell
ANALYZE=true yarn dev
ANALYZE=true yarn build
```

## Deploying

In order to deploy to alpha, beta and prod, you need to push to one of these branches:

* `deploy/alpha`: Internal testing and documentation
* `deploy/beta`: Release candidates for client testing and demonstration
* `deploy/production`: Only hard-reset to specific tags and releases and force push (locked for non-admins)

## Templating

Several methods and filters can be used to simplify templates or improve readability:

**Filter: buildClassList**

Pass an array of classes and empty strings/null values. This filter will clean it up and output a well-formatted string
of classes.

```twig
{% set classes = [
  size ? '-'~size  : '',
  round ? '-rounded'  : '',
  fontColor ? '-font-color-'~fontColor  : '',
  backgroundColor ? '-background-color-'~backgroundColor  : '',
  borderColor ? '-border-color-'~borderColor  : ''
] %}

<div class="q-icon {{ classes|buildClassList }}">
 ...
</div>
```

## Translations

Extract new translations with `bin/console tr:ex`.

You can use the [translation UI](http://localhost:8000/admin/_trans).

### Rules & requirements

* All keys must be unique, even across domains. You can easily do this by prefixing translation keys with the domain
  name.
* Keep translation keys readable for non-devs. When the content team comes in with translations, they need to know
  what's what.
* Use parameters instead of concatenation.
* Use [pluralization](https://symfony.com/doc/4.1/components/translation/usage.html#pluralization) instead of `if`
  statements

```twig
{% trans_default_domain 'homepage' %}

{{ 'homepage.intro.title'|trans }}
{{ 'homepage.intro.description'|trans }}

{{ 'homepage.name'|trans({'%name%': 'Niels Bohr'}) }}
{# 'These apples belong to %name%.' #}

{{ 'homepage.apples'|trans({'%count%': 42}) }}
{# '{0} There are no apples|{1} There is one apple|]1,19] There are %count% apples|[20,Inf[ There are many apples' #}
```
