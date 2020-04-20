const data = [
  //1
  {
    address_components: [
      [Object],
      [Object],
      [Object],
      [Object],
      [Object],
      [Object]
    ],
    formatted_address:
      '804-9 Yeoksam 2(i)-dong, Gangnam-gu, Seoul, South Korea',
    geometry: {
      location: [Object],
      location_type: 'ROOFTOP',
      viewport: [Object]
    },
    place_id: 'ChIJb2b_2ACkfDURZZoElyvnvxc',
    plus_code: {
      compound_code: 'G22V+72 Seoul, South Korea',
      global_code: '8Q99G22V+72'
    },
    types: ['street_address']
  },
  //2
  {
    address_components: [
      [Object],
      [Object],
      [Object],
      [Object],
      [Object],
      [Object]
    ],
    formatted_address:
      'Eonju-ro 85-gil, Yeoksam 2(i)-dong, Gangnam-gu, Seoul, South Korea',
    geometry: {
      bounds: [Object],
      location: [Object],
      location_type: 'APPROXIMATE',
      viewport: [Object]
    },
    place_id: 'ChIJXR4FwwCkfDURWyiEeDIuJhA',
    types: ['political', 'sublocality', 'sublocality_level_4']
  },
  //3
  {
    address_components: [[Object], [Object], [Object], [Object], [Object]],
    formatted_address: 'Yeoksam 2(i)-dong, Gangnam-gu, Seoul, South Korea',
    geometry: {
      bounds: [Object],
      location: [Object],
      location_type: 'APPROXIMATE',
      viewport: [Object]
    },
    place_id: 'ChIJY9V3fgGkfDURH6qhXwPr3Ug',
    types: ['political', 'sublocality', 'sublocality_level_2']
  },
  //4
  {
    address_components: [[Object], [Object], [Object], [Object], [Object]],
    formatted_address: 'Yeoksam 2(i)-dong, Gangnam-gu, Seoul, South Korea',
    geometry: {
      bounds: [Object],
      location: [Object],
      location_type: 'APPROXIMATE',
      viewport: [Object]
    },
    place_id: 'ChIJY9V3fgGkfDURCvyoOpHuIto',
    types: ['postal_code']
  },
  //5
  {
    address_components: [[Object], [Object], [Object]],
    formatted_address: 'Gangnam-gu, Seoul, South Korea',
    geometry: {
      bounds: [Object],
      location: [Object],
      location_type: 'APPROXIMATE',
      viewport: [Object]
    },
    place_id: 'ChIJ-4m1XyOkfDURartwxRuXMbM',
    types: ['political', 'sublocality', 'sublocality_level_1']
  },
  //6
  {
    address_components: [[Object], [Object]],
    formatted_address: 'Seoul, South Korea',
    geometry: {
      bounds: [Object],
      location: [Object],
      location_type: 'APPROXIMATE',
      viewport: [Object]
    },
    place_id: 'ChIJzzlcLQGifDURm_JbQKHsEX4',
    types: ['administrative_area_level_1', 'political']
  },
  {
    address_components: [[Object], [Object], [Object]],
    formatted_address: 'Seoul, South Korea',
    geometry: {
      bounds: [Object],
      location: [Object],
      location_type: 'APPROXIMATE',
      viewport: [Object]
    },
    place_id: 'ChIJzWXFYYuifDUR64Pq5LTtioU',
    types: ['locality', 'political']
  },
  {
    address_components: [[Object]],
    formatted_address: 'South Korea',
    geometry: {
      bounds: [Object],
      location: [Object],
      location_type: 'APPROXIMATE',
      viewport: [Object]
    },
    place_id: 'ChIJm7oRy-tVZDURS9uIugCbJJE',
    types: ['country', 'political']
  }
];

console.log(data[0].formatted_address.split(','));
