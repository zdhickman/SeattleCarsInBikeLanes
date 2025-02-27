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

function searchReportedItems(searchParams) {
    return fetch(`api/reporteditems/search?${searchParams.toString()}`)
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error when fetching searched reported items. ${response}`);
        }

        return response.json();
    })
    .then(response => {
        return response;
    });
}

function createFeatureCollection(reportedItems) {
    const features = reportedItems.map(i => {
        const position = atlas.data.Position.fromLatLng(i.location.position);
        const point = new atlas.data.Point(position);
        return new atlas.data.Feature(point, i);
    });

    return new atlas.data.FeatureCollection(features);
}

function createDataSource(reportedItems) {
    const dataSourceOptions = {
        cluster: true,
        clusterRadius: 40
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
