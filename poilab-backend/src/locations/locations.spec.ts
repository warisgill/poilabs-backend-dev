import * as Puppeteer  from "puppeteer";

let browser;
let page;
let res;

beforeAll(async () => { // initializing the browser
    browser = await Puppeteer.launch({
      headless: true // change it false for GUI browser.
    });
    page = await browser.newPage();
});


test("test defualt path", async ()=>{ 
    const page = await browser.newPage();
    res = await page.goto("http://localhost:3000");
    
    const status = await res.status();
    expect(status).toBe(200);

});


test("testing /childs. It will return 211 documents.", async ()=>{ 
    const page = await browser.newPage();
    res = await page.goto("http://localhost:3000/childs");
 
    const json = await res.json();
    const status = await res.status();

    expect(json.length).toBe(211);
    expect(status).toBe(200);

});


test("test  '/api/route' with valid source and destination (dist = 8.5) ", async ()=>{ 
    
    const page = await browser.newPage();
    res = await page.goto("http://localhost:3000/api/route?from=daa6e094-541e-43bc-bcf7-8fc146c6d98f&to=d3d0ff7a-0bd4-03e5-8868-2eccf0f63d47");
    
    let status = await res.status();
    let json = await res.json();
    
    expect(status).toBe(200);
    expect(json.dist).toBe(8.5);
    expect(json.route.length).toBe(2); // direct neighbour

});


test("test  '/api/route' with valid source and destination (dist = 130.5)", async ()=>{
    const page = await browser.newPage();
    res = await page.goto("http://localhost:3000/api/route?from=e7a8cf75-b0f0-9c85-bd1a-36c8f60bef00&to=dd91c645-1301-447d-baf9-40de4649d57a");
    
    let status = await res.status();
    let json = await res.json();
    
    expect(status).toBe(200);
    expect(json.dist).toBe(130.5);
    expect(json.route.length).toBe(14); // the route consist of 14 nodes
});

test("test '/api/route' with same source and destination", async ()=>{
    const page = await browser.newPage();
    res = await page.goto("http://localhost:3000/api/route?from=dd91c645-1301-447d-baf9-40de4649d57a&to=dd91c645-1301-447d-baf9-40de4649d57a");
    
    let status = await res.status();
    let json = await res.json();
    
    expect(status).toBe(404);
    expect(json.message).toBe("Source and destination are same.");

});


test("test '/api/route' having no path between source & destination", async ()=>{ 
    
    const page = await browser.newPage();
    res = await page.goto("http://localhost:3000/api/route?from=6e8c0bed-197c-33aa-224d-a5c4387836c1&to=dd91c645-1301-447d-baf9-40de4649d57a");
    
    let status = await res.status();
    let json = await res.json();
    
    expect(status).toBe(404);
    expect(json.message).toBe("Path not found.");

});

afterAll(() => { // closing the browser
    browser.close();
});