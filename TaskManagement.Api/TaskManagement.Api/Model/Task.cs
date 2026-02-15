using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TaskManagement.Api.Model
{
    public class Task
    {
        [Key,DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required(ErrorMessage = "Title is mandatory")]
        public string Title { get; set; }
        public string Description { get; set; }
        [Required(ErrorMessage = "Statuss is mandatory")]
        public int Status { get; set; }
        [Required(ErrorMessage = "DueDate is mandatory")]
        [DataType(DataType.Date)]
        public DateTime DueDate { get; set; }
        public DateTime CreatedAt { get; set; }

    }
}
