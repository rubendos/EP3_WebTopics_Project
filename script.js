window.onload = () => {
    const button = document.getElementById('nextButton');
    button.innerText = 'Next';

    let places = staticLoadPlaces();
    renderPlaces(places);
};

function staticLoadPlaces() {
    return [
        {
            name: 'Huis Ruben',
            location: {
                latitude: 50.840149,
                longitude: 4.072250,
            },
        },
    ];
}

var creatures = [
    {
        url: './assets/bird/scene.gltf',
        scale: '0.2 0.2 0.2',
        rotation: '0 0 0',
        info: 'Bird',
    },
    {
        url: './assets/cockatoo/scene.gltf',
        scale: '0.2 0.2 0.2',
        rotation: '0 0 0',
        info: 'Cockatoo',
    },
    {
        url: './assets/deer/scene.gltf',
        scale: '0.2 0.2 0.2',
        rotation: '0 0 0',
        info: 'Deer',
    },
];

var creatureIndex = 0;
var setCreatures = function (creature, entity) {
    if (creature.scale) {
        entity.setAttribute('scale', creature.scale);
    }

    if (creature.rotation) {
        entity.setAttribute('rotation', creature.rotation);
    }

    if (creature.position) {
        entity.setAttribute('position', creature.position);
    }

    entity.setAttribute('gltf-model', creature.url);

    const div = document.getElementById('info');
    div.innerText = creature.info;
};

function renderPlaces(places) {
    let scene = document.querySelector('a-scene');

    places.forEach((place) => {
        let latitude = place.location.latitude;
        let longitude = place.location.longitude;

        let creature = document.createElement('a-entity');
        creature.setAttribute('look-at', '[gps-camera]');
        creature.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);

        setCreatures(creatures[creatureIndex], creature);

        creature.setAttribute('animation-mixer', '');

        document.getElementById('nextButton').addEventListener('click', function () {
            var entity = document.querySelector('[gps-entity-place]');
            creatureIndex++;
            var newIndex = creatureIndex % creatures.length;
            setCreatures(creatures[newIndex], entity);
        });

        scene.appendChild(creature);
    });
}