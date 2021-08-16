window.onload = () => {
    const button = document.querySelector('button[="next"]');
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
        url: '/assets/bird/scene.gltf',
        scale: '0.5 0.5 0.5',
        rotation: '0 180 0',
        info: 'Bird',
    },
    {
        url: 'pad naar model',
        scale: '0.2 0.2 0.2',
        rotation: '0 180 0',
        info: 'info',
    },
    {
        url: 'pad naar model',
        scale: '0.08 0.08 0.08',
        rotation: '0 180 0',
        info: 'info',
    },
];

var creatureIndex = 0;
var setCreatures = function (creatures, entity) {
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

    const div = document.querySelector('.instructions');
    div.innerText = creature.info;
};

function renderPlaces(places) {
    let scene = document.querySelector('a-scene');

    places.forEach((place) => {
        let latitude = place.location.latitude;
        let longitude = place.location.longitude;

        let model = document.createElement('a-entity');
        model.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);

        setModel(creatures[creatureIndex], creature);

        model.setAttribute('animation-mixer', '');

        document.querySelector('button[data-action="next"]').addEventListener('click', function () {
            var entity = document.querySelector('[gps-entity-place]');
            creatureIndex++;
            var newIndex = creatureIndex % creatures.length;
            setModel(creatures[newIndex], entity);
        });

        scene.appendChild(model);
    });
}