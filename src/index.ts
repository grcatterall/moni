import app from './App';
app.listen(3000, (err: string) => {
  if (err) return console.log(err);
  return console.log(`Server is running in port:3000. http://localhost:3000`);
});
