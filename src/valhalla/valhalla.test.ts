import Valhalla from "."

describe("Valhalla returns responses", () => {
    it("gets a directions response", async () => {
        const v = new Valhalla({ baseUrl: "http://localhost:8002" })
        await v
            .directions(
                [
                    [1.51886, 42.5063],
                    [1.53789, 42.51007],
                ],
                "pedestrian"
            )
            .then((d) => {
                expect(d.raw).toBeDefined()
                expect(d.directions).toHaveLength(1)
                expect(d.directions[0]).toHaveProperty("feature")
                expect(d.directions[0].feature).toHaveProperty("geometry")
                expect(d.directions[0].feature.geometry).toHaveProperty(
                    "coordinates"
                )

                expect(
                    d.directions[0].feature.properties!.duration
                ).not.toBeNull()

                expect(
                    d.directions[0].feature.properties!.distance
                ).not.toBeNull()
            })
    })

    it("gets an isochrone response", async () => {
        const v = new Valhalla({ baseUrl: "http://localhost:8002" })
        await v
            .isochrones([1.52601, 42.50823], "pedestrian", [30, 90])
            .then((i) => {
                expect(i).toHaveProperty("isochrones")
                expect(i.isochrones).toHaveLength(2)
            })
    })

    it("gets an isochrone response", async () => {
        const v = new Valhalla({ baseUrl: "http://localhost:8002" })
        await v
            .isochrones([1.52601, 42.50823], "pedestrian", [30, 90], {
                polygons: true,
                id: "test-id",
            })
            .then((i) => {
                expect(i).toHaveProperty("isochrones")
                expect(i.isochrones).toHaveLength(2)
                expect(["Polygon", "MultiPolygon"]).toContain(
                    i.isochrones[0].feature.geometry.type
                )
                expect(i.raw.id === "test-id")
            })
    })

    it("gets an matrix response", async () => {
        const v = new Valhalla({ baseUrl: "http://localhost:8002" })
        await v
            .matrix(
                [
                    [1.51886, 42.5063],
                    [1.53789, 42.51007],
                ],
                "auto"
            )
            .then((m) => {
                expect(m).toHaveProperty("durations")
                expect(m).toHaveProperty("distances")
                expect(m.durations).toHaveLength(2)
            })
    })
})
