const r = require.context('./images', false, /\.jpg$/);
r.keys().forEach(r);