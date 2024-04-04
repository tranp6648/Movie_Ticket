using Microsoft.EntityFrameworkCore;
using WebApplication3.Models;

namespace WebApplication3.Services
{
    public class ActorServiceImpl : ActorService
    {
        private readonly DatabaseContext databaseContext;
        private IWebHostEnvironment _webHostEnvironment;
        public ActorServiceImpl(DatabaseContext databaseContext,IWebHostEnvironment webHostEnvironment)
        {
            this.databaseContext = databaseContext;
            _webHostEnvironment = webHostEnvironment;
        }
        private string SavePictureToFolder(string picture, string webRootBath, int id) {
            if (picture.StartsWith("data:image"))
            {
                picture = picture.Split(',')[1];
            }
            picture = picture.PadRight((picture.Length + 3) & ~3, '=');
            try
            {
                byte[]pictureBytes=Convert.FromBase64String(picture);
                string folderPath = Path.Combine(webRootBath, "image");
                if(!Directory.Exists(folderPath))
                {
                    Directory.CreateDirectory(folderPath);
                }
                string filename = $"Actor_{id}_picture.png";
                string filepath = Path.Combine(folderPath, filename);

                System.IO.File.WriteAllBytes(filepath, pictureBytes);

                return Path.Combine("image", filename);
            }
            catch(FormatException ex)
            {
                Console.WriteLine($"Error converting Base64 string: {ex.Message}");
                return null;
            }

        }
        private void DeletePictureFromFolder(int ID, string webRootPath)
        {
            string imagePath = Path.Combine(webRootPath, "image", $"Actor_{ID}_picture.png");
            if (System.IO.File.Exists(imagePath))
            {
                System.IO.File.Delete(imagePath);
            }
        }
        public bool DeleteActor(int id)
        {
            try
            {
                var Actor=databaseContext.Actors.Find(id);
                if(Actor!=null)
                {
                    databaseContext.Actors.Remove(Actor);
                    DeletePictureFromFolder(id, _webHostEnvironment.WebRootPath);
                }
                return databaseContext.SaveChanges() > 0;
            }
            catch
            {
                return false;
            }
        }

        public dynamic GetMovie()
        {
            return databaseContext.Movies.Select(x => new
            {
                Id = x.Id,
                Name = x.Title,
            }).ToList();
        }

        public bool UpdateActor(updateActor updateActor, int id)
        {
            try
            {
                var existActor = databaseContext.Actors.Find(id);
                if (existActor == null)
                {
                    return false;
                }
                existActor.Name = updateActor.Name;
                existActor.Nationality = updateActor.Nationality;
                existActor.Birthday = updateActor.Birthday;
                return databaseContext.SaveChanges() > 0;
            }
            catch
            {
                return false;
            }
        }

        public dynamic DetailActorMovie(int id)
        {
            return databaseContext.Actors.Where(a => a.DetailActorMovies.Any(d => d.IdMovieNavigation.Id == id)).Select(m => new
            {

                Name = m.Name,
                Image = m.Image,
                DetailActor = m.DetailActorMovies.Select(d => new
                {
                    Role = d.Role,
                }),
            }).ToList();
        }

        public dynamic ShowMovie(int id)
        {
            return databaseContext.Movies.Where(a => a.DetailActorMovies.Any(d => d.IdActor == id)).Select(m => new
            {
                ID = m.Id,
                itle = m.Title,
                duration = m.Duration,
                GenreName = m.IdGenreNavigation.Name,
                DetailCategoryMovies = m.DetailCategoryMovies.Select(d => new
                {
                    Picture = d.Picture,
                })
            }).ToList();
        }

        public dynamic DetailActor(int id)
        {
            return databaseContext.Actors.Where(m => m.Id == id).Select(m => new
            {
                id = m.Id,
                name = m.Name,
                image = m.Image,
                Nationally = m.Nationality,
                Birthday = m.Birthday,
                bio = m.Bio,
                DetailActorMovie = m.DetailActorMovies.Select(d => new
                {
                    Id = d.Id,
                    IDMovieNavigation = new
                    {
                        Name = d.IdMovieNavigation.Title,
                        GenreName = d.IdMovieNavigation.IdGenreNavigation.Name,
                        duration = d.IdMovieNavigation.Duration,
                        DetailMovieCategory = d.IdMovieNavigation.DetailCategoryMovies.Select(p => new
                        {
                            picture = p.Picture,
                        })
                    }
                })
            }).ToList();
        }

        public dynamic ShowActor()
        {
            return databaseContext.Actors.Select(m => new
            {
                id = m.Id,
                name = m.Name,
                image = m.Image,
                Nationally = m.Nationality,
                Birthday = m.Birthday,
                bio = m.Bio,
                DetailActorMovie = m.DetailActorMovies.Select(d => new
                {
                    Id = d.Id,
                    IDMovieNavigation = new
                    {
                        Name = d.IdMovieNavigation.Title
                    }
                })
            }).ToList();
        }

        public bool AddMovie(AddActorMovie addActorMovie)
        {
            try
            {
                if(addActorMovie== null)
                {
                    return false;
                }
                var ActorDetailMovie = new DetailActorMovie
                {
                    IdActor = addActorMovie.IdActor,
                    IdMovie = addActorMovie.IdMovie,
                    Role = addActorMovie.Role
                };
                databaseContext.DetailActorMovies.Add(ActorDetailMovie);
                return databaseContext.SaveChanges() > 0;
            }
            catch
            {
                return false;
            }
        }

        public bool AddActor(AddActor addActor)
        {
            try
            {
                var ActorEntity = new Actor
                {
                    Name = addActor.Name,
                    Image = $"Actor_{addActor.Name}_picture.png",
                    Nationality = addActor.Nationality,
                    Birthday = addActor.Birthday,
                    Bio = addActor.Bio,
                };
                databaseContext.Actors.Add(ActorEntity);
                databaseContext.SaveChanges();
                string picture = SavePictureToFolder(addActor.Image, _webHostEnvironment.WebRootPath, ActorEntity.Id);
                if (picture == null)
                {
                    return false;
                }
                ActorEntity.Image = picture;
                return databaseContext.SaveChanges() > 0;
            }
            catch
            {
                return false;
            }
           
        }
    }
}
