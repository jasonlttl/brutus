[ ![Codeship Status for jasonlttl/brutus](https://codeship.com/projects/c96289f0-630f-0134-ca04-362c74d9c9e8/status?branch=master)](https://codeship.com/projects/175253)

# Brutus Alexa Skill

This is an Alexa Skill that adds voice interfaces to some of OSU's public information systems.
The project was built for educational purposes and is unaffiliated with OSU. It is not a published skill.

## Example Queries

Alexa, ask Brutus...

* where Rebecca Stringer works

## Caveats

### Names

Alexa is really good when there are constrained choices but not so good when there are a lot of possibilities.
To aid recognition, it uses the amazon US first names slot and a custom slot trained on the ~50,000 most common
surnames from US census data (exact matches not required). Even then, there's all kinds of problems with multiple
spelling and pronounciation. This makes casual directory lookup an inherently difficult task.

## Data Sources

### directory.osu.edu

Commonly referred to as "find people", directory.osu.edu has a json service that allows public queries.

* [Exactly matching first and last name](https://directory.osu.edu/fpjson.php?firstname=Rebecca&lastname=Stringer)
* [Exactly matching on username](https://directory.osu.edu/fpjson.php?name_n=stringer.2)



