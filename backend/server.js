import express from 'express';
import {createClient} from '@supabase/supabase-js'
import morgan from 'morgan'
import bodyParser from "body-parser";

const app = express();

// using morgan for logs
app.use(morgan('combined'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

console.log(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const supabase = createClient(
  "https://dywopbcsfmtykaxbcvek.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR5d29wYmNzZm10eWtheGJjdmVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODg5MDA4NzUsImV4cCI6MjAwNDQ3Njg3NX0.5jYaWyLdJw7sr5q9Ag9XrISyNYKBQ3QRVIFwBwLFDA0"
);

app.get('/profiles', async (req, res) => {
    const {data, error} = await supabase
        .from('profiles')
        .select()
    res.send(data);
});

app.get('/profiles/:id', async (req, res) => {
  //This selects the profile with the specific id in the database
    const {data, error} = await supabase
        .from('profiles')
        .select()
        .eq('id', req.params.id)
    res.send(data);
});

app.post('', async (req, res) => {

})

// app.post('/profiles', async (req, res) => {
//     const {error} = await supabase
//         .from('profiles')
//         .insert({
//             name: req.body.name,
//             description: req.body.description,
//             price: req.body.price,
//         })
//     if (error) {
//         res.send(error);
//     }
//     res.send("created!!");
// });
//
// app.put('/profiles/:id', async (req, res) => {
//     const {error} = await supabase
//         .from('profiles')
//         .update({
//             name: req.body.name,
//             description: req.body.description,
//             price: req.body.price
//         })
//         .eq('id', req.params.id)
//     if (error) {
//         res.send(error);
//     }
//     res.send("updated!!");
// });
//
// app.delete('/profiles/:id', async (req, res) => {
//     const {error} = await supabase
//         .from('profiles')
//         .delete()
//         .eq('id', req.params.id)
//     if (error) {
//         res.send(error);
//     }
//     res.send("deleted!!")
//
// });

app.get('/', (req, res) => {
    res.send("Hello I am working my friend Supabase <3");
});

app.get('*', (req, res) => {
    res.send("Hello again I am working my friend to the moon and behind <3");
});

app.listen(4000, () => {
    console.log(`> Ready on http://localhost:3000`);
});
