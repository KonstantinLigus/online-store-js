import { addProductSubmitForm } from "@/backend/server-actions/aws/actions";

export default function AddItemPage() {
  return (
    <form
      action={addProductSubmitForm}
      style={{
        display: "flex",
        padding: "20px",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <label>
        Назва:
        <input
          type="text"
          name="title"
          style={{ border: "1px solid black " }}
        />
      </label>
      <label>
        Опис:
        <textarea
          type="text"
          name="description"
          style={{ border: "1px solid black " }}
        />
      </label>
      <label>
        Ціна:
        <input
          type="text"
          name="price"
          style={{ border: "1px solid black " }}
        />
      </label>
      <label>
        Категорія:
        <input
          type="text"
          name="category"
          style={{ border: "1px solid black " }}
        />
      </label>
      <label>
        Label:
        <input
          type="text"
          name="label"
          style={{ border: "1px solid black " }}
        />
      </label>
      <label>
        Акція:
        <input
          type="text"
          name="action"
          style={{ border: "1px solid black " }}
        />
      </label>
      <label>
        Виробник:
        <input
          type="text"
          name="producer"
          style={{ border: "1px solid black " }}
        />
      </label>
      <label>
        Одиниці виміру:
        <input type="text" name="unit" style={{ border: "1px solid black " }} />
      </label>
      <label>
        Вимір:
        <input type="text" name="step" style={{ border: "1px solid black " }} />
      </label>
      <label>
        Фотографії:
        <input
          type="file"
          accept=".jpg, .jpeg, .png, .webp"
          name="images"
          multiple
          style={{ border: "1px solid black " }}
        />
      </label>
      <label>
        Головна фотографія:
        <input
          type="file"
          accept=".jpg, .jpeg, .png, .webp"
          name="mainImage"
          style={{ border: "1px solid black " }}
        />
      </label>
      <button type="submit" style={{ width: "100px", border: "1px solid red" }}>
        Додати
      </button>
    </form>
  );
}
