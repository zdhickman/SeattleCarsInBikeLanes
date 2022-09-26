const TwitterUsername = 'carbikelanesea';

function getAllReportedItems() {
    const url = 'api/reporteditems/all';
    return fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error when fetching all reported items. ${response}`);
        }

        return response.json();
    })
    .then(response => {
        return response;
    });
}

function createFeatureCollection(reportedItems) {
    const features = reportedItems.map(i => {
        const position = new atlas.data.Position(i.location.longitude, i.location.latitude);
        const point = new atlas.data.Point(position);
        return new atlas.data.Feature(point, i);
    });

    return new atlas.data.FeatureCollection(features);
}

function createDataSource(reportedItems) {
    const dataSourceOptions = {
        cluster: true
    };
    const source = new atlas.source.DataSource(null, dataSourceOptions);
    source.add(createFeatureCollection(reportedItems));
    return source;
}

function getTwitterOEmbed(tweetId) {
    return fetch(`api/Twitter/oembed?tweetId=${tweetId}`)
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error when fetching Twitter oEmbed. ${response}`);
        }

        return response.json();
    })
    .then(response => {
        if (response) {
            return response.html;
        } else {
            return null;
        }
    });
}
