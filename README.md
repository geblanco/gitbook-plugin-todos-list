Gitbook Plugin Todos List
=============

A gitbook plugin to automatically create a list of todos.

### Install

Add this to your `book.json`, then run `gitbook install`:

```json
{
    "plugins": ["todos-list"]
}
```

### Setup

No configuration is needed.

### Usage

When you want to create a todo called `Buy apples` you can do it like this:

```
{{ "Buy apples" | todo }}
```

Then, to obtain a list of todos:

```
{% todos %} {% endtodos %}
```

To mark a todo as done:

```
{{ "Buy apples" | todo(true) }}
```

Then it will appear as ~~ToDo:= Buy apples~~ and checked in the list of todos

I think is better to keep this list in a Todos.md file or something like that, but is up to you.

### Notes

The key `todo` here is also parsed as `ToDo` and `TODO`, so you can write it as you want, the same applies to `todos`.